import React from "react";
import { dateToDisplay } from "../../utils/date";
import Text from "../Text";
import Table from "./Table";
import { useAppSelector } from "../../hooks";
import { account } from "../../state/accountSlice";
import { getColorByPl } from "./helpers";
import PlaceHolder from "./PlaceHolder";
import { formatNumber } from "../../utils/format";
import Button from "../Button";
import useTheme from "../../hooks/useTheme";
import { usePlaceMarketOrderMutation } from "../../utils/api/orderApi";
import { OrderSide } from "../../types/order";

const Positions = () => {
  const { positions } = useAppSelector(account);
  const { themeColors } = useTheme();
  const [placeMarketOrder] = usePlaceMarketOrderMutation();
  const closePosition = ({ size, side }: { size: string; side: OrderSide }) => {
    placeMarketOrder({
      isBuy: side !== OrderSide.buy,
      volume: Math.abs(+size),
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
      header: "U&Pl",
      cell: (props: any) => (
        <Text color={getColorByPl(props.getValue())}>
          {formatNumber({ value: +props.getValue(), fixed: 2 })}
        </Text>
      ),
    },
    {
      header: "Close position",
      cell: (props: any) => {
        console.log(props);
        const { size, side } = props.row.original;
        return (
          <Button
            variant="link"
            onClick={() => closePosition({ size, side })}
            color={themeColors.text.secondaryLink}
          >
            Market
          </Button>
        );
      },
    },
  ];
  if (!positions.length) {
    return <PlaceHolder>No Orders yet</PlaceHolder>;
  }
  return <Table columns={columns} data={positions} />;
};

export default Positions;
