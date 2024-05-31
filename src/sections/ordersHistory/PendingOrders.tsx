import React from "react";
import { dateToDisplay } from "../../utils/date";
import { Table, Text, Button } from "../../components/";
import { useAppSelector } from "../../hooks";
import { account } from "../../state/accountSlice";
import { errorAlert, successAlert } from "../../utils/alerts";
import { getSideColor } from "./helpers";
import PlaceHolder from "./PlaceHolder";
import { useRemoveOrderMutation } from "../../utils/api/orderApi";
import { handleApiCall } from "../../utils/handleApiCall";

const PendingOrders = () => {
  const { openOrders } = useAppSelector(account);
  const [removeOrder] = useRemoveOrderMutation();
  const canselOrder = async (orderId: string) => {
    const response = await removeOrder(orderId);
    handleApiCall(
      response,
      () => errorAlert("Can not cancel the order"),
      () => successAlert("Order canceled")
    );
  };
  const columns = [
    {
      flex: 1,
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
      flex: 1,
      accessorKey: "id",
      header: "Cancel",
      cell: (props: any) => (
        <Button variant="error" onClick={() => canselOrder(props.getValue())}>
          Cancel
        </Button>
      ),
    },
  ];

  if (!openOrders.length) {
    return <PlaceHolder>No Orders yet</PlaceHolder>;
  }
  return (
    <Table
      columns={columns}
      data={openOrders}
      headerStyle={{ backgroundColor: "#031a28" }}
    />
  );
};

export default PendingOrders;
