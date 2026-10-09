"use client";

interface Column {
  header: string;
  accessor: string;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, React.ReactNode>[];
}

export default function DataTable({ columns, data }: DataTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-xl bg-white shadow">
      <table className="w-full text-left text-sm">
        {/* HEADER */}
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="p-3 font-semibold">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t hover:bg-slate-50">
              {columns.map((col, j) => (
                <td key={j} className="p-3">
                  {row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
