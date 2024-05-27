import React from "react";
import { dateToDisplay } from "../../utils/date";
import Text from "../Text";
import Table from "./Table";
import { useAppSelector } from "../../hooks";
import { account } from "../../state/accountSlice";
import { getSideColor } from "./helpers";
import PlaceHolder from "./PlaceHolder";
import { formatNumber } from "../../utils/format";

const ClosedOrders = () => {
  const { closedOrders } = useAppSelector(account);
  const columns = [
    {
      accessorKey: "timestamp",
      header: "Date",
      cell: (props: any) => (
        <Text color="tertiary">{dateToDisplay(props.getValue())}</Text>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Size",
      cell: (props: any) => <Text color="tertiary">{props.getValue()}</Text>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: (props: any) => (
        <Text color="tertiary">
          {formatNumber({ value: +props.getValue(), fixed: 2 })}
        </Text>
      ),
    },
    {
      accessorKey: "side",
      header: "Side",
      cell: (props: any) => (
        <Text color={getSideColor(props.getValue())}>{props.getValue()}</Text>
      ),
    },
  ];
  if (!closedOrders.length) {
    return <PlaceHolder>No Orders yet</PlaceHolder>;
  }
  return <Table columns={columns} data={closedOrders} />;
};

export default ClosedOrders;
