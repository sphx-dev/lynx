import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { mockColumns, mockData } from "./constants"
import styled from "styled-components"
import { getThemeColors } from "../../theme"
interface ITableProps {
  data?: any
  columns?: any
}
const StyledTable = styled.table`
  ${({ theme }) => theme.fonts.typography.textSm};
  color: ${({ theme }) => getThemeColors(theme).text.tertiary};
  border-collapse: collapse;
  thead {
    border-top: ${({ theme }) =>
      `1px solid ${theme.colors.selectedTheme.tableTabs.border}`};
    border-bottom: ${({ theme }) =>
      `1px solid ${theme.colors.selectedTheme.tableTabs.border}`};
    tr th {
      padding:  8px 25px;
    }
    
  }
;
  }
`
const Table = ({ data = mockData, columns = mockColumns }: ITableProps) => {
  const table = useReactTable<any>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <StyledTable>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header: any) => (
              <th>{header.column.columnDef.header}</th>
            ))}
          </tr>
        ))}
      </thead>
      {/*{table.getRowModel().rows.map((row) => (*/}
      {/*  <tr key={row.id}>*/}
      {/*    {row.getVisibleCells().map((cell) => (*/}
      {/*      <td>*/}
      {/*        {flexRender(cell.column.columnDef.cell, cell.getContext())}*/}
      {/*      </td>*/}
      {/*    ))}*/}
      {/*  </tr>*/}
      {/*))}*/}
    </StyledTable>
  )
}

export default Table
