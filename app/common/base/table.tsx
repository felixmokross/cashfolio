import { type ReactNode } from "react";
import { cn } from "./classnames";

type RowData = Record<string, string | number | Date>;

export type TableProps<TData extends RowData> = {
  columns: ColDef<TData>[];
  data: TData[];
  getRowId: (row: TData) => string | number;
};

type ColDef<TData extends RowData> = {
  name: string;
  field: keyof TData;
  render?: (data: TData) => ReactNode;
};

export function Table<TData extends RowData>({
  columns,
  data,
  getRowId,
}: TableProps<TData>) {
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          {columns.map((col, colIndex) => (
            <th
              scope="col"
              key={col.field.toString()}
              className={cn(
                colIndex === 0 ? "pl-4 sm:pl-6" : "pl-3",
                colIndex === columns.length - 1 ? "pr-4 sm:pr-6" : "pr-3",
                "py-3.5 text-left text-sm font-semibold text-gray-900",
              )}
            >
              {col.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {data.map((row) => (
          <tr key={getRowId(row)}>
            {columns.map((col, colIndex) => (
              <td
                key={col.field.toString()}
                className={cn(
                  colIndex === 0 ? "pl-4 sm:pl-6" : "pl-3",
                  colIndex === columns.length - 1 ? "pr-4 sm:pr-6" : "pr-3",
                  "whitespace-nowrap py-4 text-sm text-gray-500",
                )}
              >
                {col.render ? (
                  col.render(row)
                ) : (
                  <>{row[col.field].toString()}</>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
