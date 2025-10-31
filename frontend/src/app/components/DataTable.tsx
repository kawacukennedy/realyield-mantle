import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface Column {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onSort?: (key: string) => void;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  className?: string;
  striped?: boolean;
  hoverable?: boolean;
}

export default function DataTable({
  columns,
  data,
  onSort,
  sortKey,
  sortDirection,
  className = '',
  striped = true,
  hoverable = true
}: DataTableProps) {
  const getSortIcon = (key: string) => {
    if (sortKey !== key) return <ArrowUpDown size={14} className="opacity-50" />;
    return sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  return (
    <div className={`overflow-x-auto rounded-xl border border-border bg-bg-card ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-bg-muted/50">
            {columns.map((col, index) => (
              <motion.th
                key={col.key}
                className={`p-4 text-left font-semibold text-text ${
                  col.sortable ? 'cursor-pointer hover:bg-bg-muted transition-colors' : ''
                } ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : ''}`}
                style={{ width: col.width }}
                onClick={() => col.sortable && onSort?.(col.key)}
                whileHover={col.sortable ? { backgroundColor: 'var(--bg-muted)' } : {}}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className={`flex items-center gap-2 ${
                  col.align === 'center' ? 'justify-center' :
                  col.align === 'right' ? 'justify-end' : 'justify-start'
                }`}>
                  <span>{col.header}</span>
                  {col.sortable && getSortIcon(col.key)}
                </div>
              </motion.th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <motion.tr
              key={rowIndex}
              className={`border-b border-border/50 transition-colors ${
                striped && rowIndex % 2 === 1 ? 'bg-bg-muted/20' : ''
              } ${hoverable ? 'hover:bg-bg-muted/50' : ''}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: rowIndex * 0.02 }}
              whileHover={hoverable ? { scale: 1.01, backgroundColor: 'var(--bg-muted)' } : {}}
            >
              {columns.map(col => (
                <td
                  key={col.key}
                  className={`p-4 text-text ${
                    col.align === 'center' ? 'text-center' :
                    col.align === 'right' ? 'text-right' : ''
                  }`}
                >
                  {row[col.key]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <motion.div
          className="text-center py-12 text-text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 bg-bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
            <ArrowUpDown size={24} className="text-text-muted" />
          </div>
          <p>No data available</p>
        </motion.div>
      )}
    </div>
  );
}