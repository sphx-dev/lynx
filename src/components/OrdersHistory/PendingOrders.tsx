import React from "react";
import { dateToDisplay } from "../../utils/date";
import Text from "../Text";
import Table from "./Table";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { account, removeOrder } from "../../state/accountSlice";
import Button from "../Button";
import { errorAlert, successAlert } from "../../utils/alerts";
import { getSideColor } from "./helpers";

const PendingOrders = () => {
  const { openOrders } = useAppSelector(account);
  const dispatch = useAppDispatch();
  const canselOrder = (orderId: string) =>
    dispatch(removeOrder(orderId))
      .unwrap()
      .then(() => successAlert("Order canceled"))
      .catch(() => errorAlert("Can not cancel the order"));
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
      cell: (props: any) => <Text color="tertiary">{props.getValue()}</Text>,
    },
    {
      accessorKey: "side",
      header: "Side",
      cell: (props: any) => (
        <Text color={getSideColor(props.getValue())}>{props.getValue()}</Text>
      ),
    },
    {
      accessorKey: "id",
      header: "Cancel",
      cell: (props: any) => (
        <Button variant="error" onClick={() => canselOrder(props.getValue())}>
          Cancel
        </Button>
      ),
    },
  ];
  return <Table columns={columns} data={openOrders} />;
};

export default PendingOrders;
