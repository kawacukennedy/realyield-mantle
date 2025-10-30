import { render, screen, fireEvent } from '@testing-library/react';
import KYCSection from '../src/app/components/KYCSection';

test('renders KYC section', () => {
  const mockSetKycStatus = jest.fn();
  render(<KYCSection kycStatus={false} setKycStatus={mockSetKycStatus} />);
  expect(screen.getByText('KYC Attestation')).toBeInTheDocument();
});

test('shows complete KYC button when not approved', () => {
  const mockSetKycStatus = jest.fn();
  render(<KYCSection kycStatus={false} setKycStatus={mockSetKycStatus} />);
  expect(screen.getByText('Complete KYC')).toBeInTheDocument();
});

test('shows approved message when KYC is approved', () => {
  const mockSetKycStatus = jest.fn();
  render(<KYCSection kycStatus={true} setKycStatus={mockSetKycStatus} />);
  expect(screen.getByText('KYC Approved')).toBeInTheDocument();
});