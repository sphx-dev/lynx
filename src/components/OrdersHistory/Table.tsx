import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { mockColumns, mockData } from "./constants"

interface ITableProps {
  data?: any
  columns?: any
}
const Table = ({ data = mockData, columns = mockColumns }: ITableProps) => {
  const table = useReactTable<any>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th>{header.column.columnDef.header}</th>
            ))}
          </tr>
        ))}
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </thead>
    </table>
  )
}

export default Table
