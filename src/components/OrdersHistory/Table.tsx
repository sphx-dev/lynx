import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { mockColumns } from "./constants";
import styled from "styled-components";
import { getThemeColors } from "../../theme";
interface ITableProps {
  data?: any;
  columns?: any;
}
const StyledTable = styled.table`
  ${({ theme }) => theme.fonts.typography.textSm};
  color: ${({ theme }) => getThemeColors(theme).text.tertiary};
  border-collapse: collapse;
  width: 100%;
  thead {
    background: #031a28;
    position: sticky;
    top: -1px;
    border: none;
    tr th {
      padding: 8px 25px;
      text-align: left;
      border: none;
      border-top: ${({ theme }) =>
        `1px solid ${theme.colors.selectedTheme.tableTabs.border}`};
      border-bottom: ${({ theme }) =>
        `1px solid ${theme.colors.selectedTheme.tableTabs.border}`};
    }
  }
  tbody {
    tr td {
      padding: 8px 25px;
    }
  }
`;
const Table = ({ data = [], columns = mockColumns }: ITableProps) => {
  const table = useReactTable<any>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <StyledTable>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header: any) => (
              <th key={header.column?.id}>{header.column.columnDef.header}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;
