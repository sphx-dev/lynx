import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";

import { mockColumns } from "../../sections/ordersHistory/constants";
import styled from "styled-components";
import { getThemeColors } from "../../theme";
import { CSSProperties } from "react";
import Icon from "../Icon";
import useTheme from "../../hooks/useTheme";
interface ITableProps<T> {
  data?: T[];
  columns?: any;
  headerStyle?: CSSProperties;
  onClick?: (data: T) => void;
  enableSorting?: boolean;
}
const StyledTable = styled.table`
  ${({ theme }) => theme.fonts.typography.textSm};
  color: ${({ theme }) => getThemeColors(theme).text.tertiary};
  border-collapse: collapse;
  width: 100%;
  thead {
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

const StyledRow = styled.tr`
  &:hover {
    background-color: ${({ onClick }) =>
      onClick ? "rgba(255,255,255,.1)" : "transparent"};
  }
  cursor: ${({ onClick }) => (onClick ? "pointer" : "unset")};
`;

const StyledTh = styled.div<{ $canSort: boolean }>`
  cursor: ${({ $canSort }) => ($canSort ? "pointer" : "unset")};
  display: flex;
  align-items: center;
`;
const Table = <T extends object>({
  data = [],
  columns = mockColumns,
  headerStyle,
  onClick,
  enableSorting = false,
}: ITableProps<T>) => {
  const table = useReactTable<any>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting,
  });
  const { themeColors } = useTheme();

  return (
    <StyledTable>
      <thead style={headerStyle}>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header: any) => (
              <th
                onClick={header.column.getToggleSortingHandler()}
                key={header.column?.id}
              >
                <StyledTh $canSort={header.column.getCanSort()}>
                  {header.column.columnDef.header}
                  {header.column.getCanSort() && (
                    <Icon icon="SortIcon" color={themeColors.tertiary} />
                  )}
                </StyledTh>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <StyledRow
            key={row.id}
            onClick={onClick && (() => onClick(row.original))}
          >
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </StyledRow>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;
