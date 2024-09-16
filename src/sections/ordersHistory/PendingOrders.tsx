import { useMemo } from "react";
import { dateToDisplay } from "../../utils/date";
import { Table, Text, Button } from "../../components/";
import { getSideColor } from "./helpers";
import PlaceHolder from "./PlaceHolder";
import { useChainCosmoshub } from "../../hooks/useChainCosmoshub";
import { useMarginAccount } from "../../hooks/useMarginAccounts";
import { useOrders } from "../../hooks/useOrders";
import { OrderSide } from "../../../proto-codecs/codegen/sphx/order/order";
import { Side } from "../../types/order";

const PendingOrders = () => {
  // const { openOrders } = useAppSelector(account);
  // const [removeOrder] = useRemoveOrderMutation();
  // const canselOrder = async (orderId: string) => {
  //   const response = await removeOrder(orderId);
  //   handleApiCall(
  //     response,
  //     () => errorAlert("Can not cancel the order"),
  //     () => successAlert("Order canceled")
  //   );
  // };
  const columns = [
    {
      flex: 1,
      accessorKey: "timestamp",
      header: "Date",
      cell: (props: any) => (
        <Text color="tertiary">
          {dateToDisplay(Number(props.getValue()) * 1000)}
        </Text>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Size",
      cell: (props: any) => (
        <Text color="tertiary">{Number(props.getValue()) / 1e6}</Text>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: (props: any) => (
        <Text color="tertiary">{Number(props.getValue())}</Text>
      ),
    },
    {
      accessorKey: "side",
      header: "Side",
      cell: (props: any) => (
        <Text
          color={getSideColor(
            props.getValue() === OrderSide.ORDER_SIDE_BUY ? Side.Buy : Side.Sell
          )}
        >
          {props.getValue() === OrderSide.ORDER_SIDE_BUY ? "buy" : "sell"}
        </Text>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (props: any) => <Text>{props.getValue()}</Text>,
    },
    {
      flex: 1,
      accessorKey: "id",
      header: "Cancel",
      cell: (props: any) => (
        <Button
          variant="error"
          onClick={() => console.log("TODO: Cancel order", props.getValue())}
        >
          Cancel
        </Button>
      ),
    },
  ];

  const { address } = useChainCosmoshub();
  const { selectedAddress } = useMarginAccount(address);

  const { orders } = useOrders(selectedAddress);
  const sortedOrders = useMemo(
    () => orders?.toSorted((a, b) => Number(a.timestamp - b.timestamp)),
    [orders]
  );
  console.log("========>", sortedOrders);

  // if (!openOrders.length) {
  if (!sortedOrders.length) {
    return <PlaceHolder>No Orders yet</PlaceHolder>;
  }
  return (
    <Table
      columns={columns}
      // data={openOrders}
      data={sortedOrders}
      headerStyle={{ backgroundColor: "#031a28" }}
    />
  );
};

export default PendingOrders;
