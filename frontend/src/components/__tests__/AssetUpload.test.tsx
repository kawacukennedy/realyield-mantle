import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AssetUpload from '../AssetUpload';

const mockOnUploadComplete = jest.fn();

describe('AssetUpload', () => {
  beforeEach(() => {
    mockOnUploadComplete.mockClear();
  });

  it('renders upload area initially', () => {
    render(<AssetUpload onUploadComplete={mockOnUploadComplete} />);

    expect(screen.getByText(/drag & drop your asset documents/i)).toBeInTheDocument();
    expect(screen.getByText(/supported: pdf, png, jpg, docx/i)).toBeInTheDocument();
  });

  it('shows file after selection', async () => {
    render(<AssetUpload onUploadComplete={mockOnUploadComplete} />);

    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const input = screen.getByTestId('file-input') || document.querySelector('input[type="file"]');

    if (input) {
      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        expect(screen.getByText('test.pdf')).toBeInTheDocument();
      });
    }
  });

  it('calls onUploadComplete after successful upload', async () => {
    render(<AssetUpload onUploadComplete={mockOnUploadComplete} />);

    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const input = document.querySelector('input[type="file"]');

    if (input) {
      fireEvent.change(input, { target: { files: [file] } });

      const uploadButton = screen.getByText(/upload to ipfs/i);
      fireEvent.click(uploadButton);

      await waitFor(() => {
        expect(mockOnUploadComplete).toHaveBeenCalledWith(expect.any(String));
      });
    }
  });

  it('shows error for invalid file type', () => {
    render(<AssetUpload onUploadComplete={mockOnUploadComplete} />);

    const file = new File(['test'], 'test.exe', { type: 'application/x-msdownload' });
    const input = document.querySelector('input[type="file"]');

    if (input) {
      fireEvent.change(input, { target: { files: [file] } });

      expect(screen.getByText(/file type not supported/i)).toBeInTheDocument();
    }
  });

  it('shows error for file too large', () => {
    render(<AssetUpload onUploadComplete={mockOnUploadComplete} maxSize={1} />); // 1MB limit

    const largeFile = new File(['x'.repeat(2 * 1024 * 1024)], 'large.pdf', { type: 'application/pdf' });
    const input = document.querySelector('input[type="file"]');

    if (input) {
      fireEvent.change(input, { target: { files: [largeFile] } });

      expect(screen.getByText(/file size must be less than 1mb/i)).toBeInTheDocument();
    }
  });
});