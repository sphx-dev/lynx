import React, { MouseEvent, useCallback, useMemo } from "react";
import { TradePair } from "../../types/futures";
import Text from "../Text";
import Group from "../Group";
import { formatNumber } from "../../utils/format";
import Table from "../Table/Table";
import Icon from "../Icon";
import useTheme from "../../hooks/useTheme";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectFavoriteSymbols,
  setCurrentPair,
  toggleFavorite,
} from "../../state/futuresSlice";

const IconButton = styled.button`
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
`;

interface Props {
  list: TradePair[];
  closePopup: Function;
}
const FuturesList = ({ list, closePopup }: Props) => {
  const { themeColors } = useTheme();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavoriteSymbols);

  const getColor = useCallback(
    (symbol: string) => {
      return favorites.includes(symbol)
        ? themeColors.text.secondaryLink
        : "none";
    },
    [favorites, themeColors.text.secondaryLink]
  );

  const handleRowClick = (row: TradePair) => {
    dispatch(setCurrentPair(row));
    closePopup();
  };

  const handleToggleFavorite = useCallback(
    (value: string) => (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      dispatch(toggleFavorite(value));
    },
    [dispatch]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "symbol",
        header: "Symbol",
        cell: (props: any) => (
          <Group align="center">
            <IconButton onClick={handleToggleFavorite(props.getValue())}>
              <Icon
                icon="StarIcon"
                size="small"
                stroke={themeColors.text.secondaryLink}
                strokeWidth={2}
                color={getColor(props.getValue())}
              />
            </IconButton>
            <Text>{props.getValue()}</Text>
          </Group>
        ),
      },
      {
        accessorKey: "price",
        header: "Last Price",
        sortingFn: "alphanumeric",
        cell: (props: any) => (
          <Text>{formatNumber({ value: +props.getValue(), fixed: 2 })}</Text>
        ),
      },
      {
        accessorKey: "volume",
        header: "Vol",
        cell: (props: any) => (
          <Text>{formatNumber({ value: +props.getValue(), fixed: 2 })}</Text>
        ),
      },
      {
        accessorKey: "changeLastDay",
        header: "24h %",
        cell: (props: any) => (
          <Text>{formatNumber({ value: props.getValue(), fixed: 2 })}</Text>
        ),
      },
    ],
    [getColor, handleToggleFavorite, themeColors.text.secondaryLink]
  );
  return (
    <Table
      enableSorting
      columns={columns}
      data={list}
      onClick={handleRowClick}
      headerStyle={{ backgroundColor: themeColors.background.dropdown }}
    />
  );
};

export default FuturesList;
