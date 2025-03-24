import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";

import { mockColumns } from "../../sections/ordersTabs/constants";
import styled from "styled-components";
import React, { CSSProperties } from "react";
import Icon from "../Icon";
interface ITableProps<T> {
  data?: T[];
  columns?: any[];
  headerStyle?: CSSProperties;
  onClick?: (data: T) => void;
  enableSorting?: boolean;
  "data-testid"?: string;
}
const StyledTable = styled.table`
  font-family: var(--text-sm-font-family);
  font-size: var(--text-sm-font-size);
  font-weight: var(--text-sm-font-weight);
  line-height: var(--text-sm-line-height);
  color: var(--text-tertiary);
  border-collapse: collapse;
  width: 100%;
  thead {
    position: sticky;
    top: -1px;
    border: none;
    tr th {
      padding: 8px 2px;
      white-space: nowrap;
      &:first-child {
        text-align: left;
        padding-left: 8px;
      }
      text-align: center;
      border: none;
      border-top: 1px solid var(--table-tabs-border);
      border-bottom: 1px solid var(--table-tabs-border);
    }
  }
  tbody {
    tr td {
      &:first-child {
        text-align: left;
      }
      text-align: center;
      padding: 8px 2px;
      white-space: nowrap;
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
  display: inline-flex;
  align-items: center;
`;
const Table = <T extends object>({
  data = [],
  columns = mockColumns,
  headerStyle,
  onClick,
  enableSorting = false,
  ...rest
}: ITableProps<T>) => {
  const table = useReactTable<any>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableSorting,
    getSubRows: row => row.subRows,
  });

  return (
    <StyledTable data-testid={rest["data-testid"]}>
      <thead style={headerStyle}>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header: any) => {
              const HeaderWrapperComponent =
                header.column.columnDef?.HeaderWrapperComponent ||
                React.Fragment;
              return (
                <th
                  onClick={header.column.getToggleSortingHandler()}
                  key={header.column?.id}
                >
                  <StyledTh $canSort={header.column.getCanSort()}>
                    <HeaderWrapperComponent>
                      {header.column.columnDef.header}
                      {header.column.getCanSort() && (
                        <Icon icon="SortIcon" color={"var(--tertiary)"} />
                      )}
                    </HeaderWrapperComponent>
                  </StyledTh>
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <React.Fragment key={row.id}>
            <StyledRow onClick={onClick && (() => onClick(row.original))}>
              {row.getVisibleCells().map(cell => {
                let meta;
                if (cell.column.columnDef?.meta) {
                  meta = cell.column.columnDef.meta as any;
                }
                if (
                  meta?.background &&
                  typeof meta?.background === "function"
                ) {
                  return (
                    <td
                      key={cell.id}
                      style={{
                        background: meta?.background(cell.getContext()),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                }
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </StyledRow>
          </React.Fragment>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map(footerGroup => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map(footer => (
              <th key={footer.id}>
                {flexRender(
                  footer.column.columnDef.footer,
                  footer.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </StyledTable>
  );
};

export default Table;
