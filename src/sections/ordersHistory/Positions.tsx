import React from "react";
import { dateToDisplay } from "../../utils/date";
import { Text, Table, Button } from "../../components";
import { useAppSelector } from "../../hooks";
import { account } from "../../state/accountSlice";
import { getColorByPl } from "./helpers";
import PlaceHolder from "./PlaceHolder";
import { formatNumber } from "../../utils/format";
import useTheme from "../../hooks/useTheme";
import { usePlaceMarketOrderMutation } from "../../utils/api/orderApi";
import { OrderSide, OrderType } from "../../types/order";
import { useGetAccountQuery } from "../../utils/api/accountApi";
import { useChainCosmoshub } from "../../hooks/useChainCosmoshub";

const Positions = () => {
  const { positions } = useAppSelector(account);
  const { themeColors } = useTheme();
  const { isConnected } = useChainCosmoshub();

  const [placeMarketOrder] = usePlaceMarketOrderMutation();

  useGetAccountQuery(undefined, {
    pollingInterval: 5000,
    skip: !isConnected,
  });
  const closePosition = ({
    size,
    side,
    leverage,
  }: {
    size: string;
    side: OrderSide;
    leverage: number;
  }) => {
    placeMarketOrder({
      isBuy: side !== OrderSide.buy,
      volume: Math.abs(+size),
      leverage: leverage || 1,
      orderType: OrderType.MARKET,
    });
  };
  const columns = [
    {
      accessorKey: "entryTime",
      header: "Date",
      cell: (props: any) => (
        <Text color="tertiary">{dateToDisplay(props.getValue())}</Text>
      ),
    },
    {
      accessorKey: "ticker",
      header: "Symbol",
      cell: (props: any) => (
        <Text color="tertiary">{props.getValue().replace(".P", "")}</Text>
      ),
    },
    {
      accessorKey: "entryPrice",
      header: "Entry Price",
      cell: (props: any) => (
        <Text color="tertiary">
          {formatNumber({ value: +props.getValue(), fixed: 2 })}
        </Text>
      ),
    },
    {
      accessorKey: "size",
      header: "Size",
      cell: (props: any) => <Text color="tertiary">{props.getValue()}</Text>,
    },
    {
      accessorKey: "unrealizedPl",
      header: "PNL",
      cell: (props: any) => (
        <Text color={getColorByPl(props.getValue())}>
          {formatNumber({ value: +props.getValue(), fixed: 2 })}
        </Text>
      ),
      width: "100px",
    },
    {
      header: "Close",
      cell: (props: any) => {
        console.log(props);
        const { size, side, leverage } = props.row.original;
        return (
          <Button
            variant="link"
            onClick={() => closePosition({ size, side, leverage })}
            color={themeColors.text.secondaryLink}
          >
            Market
          </Button>
        );
      },
    },
  ];
  if (!positions.length || !isConnected) {
    return <PlaceHolder>No Orders yet</PlaceHolder>;
  }
  return <Table columns={columns} data={positions} />;
};

export default Positions;
