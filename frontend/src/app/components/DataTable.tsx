import React from 'react';

interface Column {
  key: string;
  header: string;
  sortable?: boolean;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onSort?: (key: string) => void;
}

export default function DataTable({ columns, data, onSort }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            {columns.map(col => (
              <th
                key={col.key}
                className={`p-2 text-left ${col.sortable ? 'cursor-pointer hover:bg-muted' : ''}`}
                onClick={() => col.sortable && onSort?.(col.key)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b hover:bg-muted">
              {columns.map(col => (
                <td key={col.key} className="p-2">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}