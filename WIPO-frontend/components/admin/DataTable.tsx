"use client";

import React from "react";

// FIX: Agar ActionButtons file nahi mil rahi, to use abhi ke liye comment kar dete hain 
// taaki build pass ho jaye. Agar file mil jaye to path sahi karke uncomment kar lena.
// import ActionButtons from "../ActionButtons"; 

interface Column<T> {
  header: string;
  accessor: keyof T; // Yeh data object ki key honi chahiye
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  actions?: (row: T) => React.ReactNode; // Har row ke liye optional buttons
}

export default function DataTable<T extends Record<string, any>>({
  columns,
  data,
  actions,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border border-green-100 rounded-xl overflow-hidden shadow-sm">
        <thead className="bg-green-50">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className="text-left px-4 py-3 text-sm font-semibold text-green-700"
              >
                {col.header}
              </th>
            ))}
            {actions && (
              <th className="text-left px-4 py-3 text-sm font-semibold text-green-700">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody className="bg-white">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t border-green-100 hover:bg-green-50/40 transition"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-4 py-3 text-sm text-gray-700">
                    {/* TypeScript fix: Convert value to string or ReactNode */}
                    {row[col.accessor] !== null && row[col.accessor] !== undefined
                      ? String(row[col.accessor])
                      : "-"}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-3 text-sm">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td 
                colSpan={columns.length + (actions ? 1 : 0)} 
                className="px-4 py-8 text-center text-gray-500 italic"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}