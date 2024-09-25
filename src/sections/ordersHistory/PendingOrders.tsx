import { useMemo, useState } from "react";

import { Table, Text, Button } from "../../components/";
import { getOrderStatusText, getSideColor } from "./helpers";
import PlaceHolder from "./PlaceHolder";
import { useChainCosmoshub } from "../../hooks/useChainCosmoshub";
import { useMarginAccount } from "../../hooks/useMarginAccounts";
import { useCancelOrder, useOrders } from "../../hooks/useOrders";
import { OrderSide } from "../../../proto-codecs/codegen/sphx/order/order";
import { Side } from "../../types/order";
import { useTranslation } from "react-i18next";
import { successAlert } from "@/utils/alerts";
import { useMarkets } from "../../hooks/useMarkets";
import dayjs from "dayjs";
import { OrderStatus } from "proto-codecs/codegen/sphx/order/validated_order";
import { Pagination } from "@/components/Pagination";

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

  const { t } = useTranslation();
  const { address } = useChainCosmoshub();
  const { selectedAddress } = useMarginAccount(address);

  const { markets } = useMarkets();
  const marketMap = useMemo(() => {
    const map = new Map();
    markets.forEach(m => {
      map.set(m.id, m.baseAsset + "/" + m.quoteAsset);
    });
    return map;
  }, [markets]);

  const [page, setPage] = useState<number>(0);

  const [cancelingOrders, setCancelingOrders] = useState<any[]>([]);

  const { orders, totalOrders, pageSize } = useOrders(
    selectedAddress,
    page,
    OrderStatus.ORDER_STATUS_OPEN
  );

  const { cancelOrder } = useCancelOrder();

  const columns = [
    {
      accessorKey: "marketId",
      header: "Market",
      cell: (props: any) => (
        <Text color="tertiary">{marketMap.get(props.getValue())}</Text>
      ),
    },
    {
      flex: 1,
      accessorKey: "timestamp",
      header: "Date",
      cell: (props: any) => (
        <Text color="tertiary">
          {dayjs(Date.now()).diff(
            dayjs(Number(props.getValue()) * 1000),
            "day"
          ) > 1
            ? dayjs(Number(props.getValue()) * 1000).format("YYYY-MM-DD")
            : dayjs(Number(props.getValue()) * 1000).format("HH:mm:ss")}
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
      accessorKey: "leverage",
      header: "Lev.",
      cell: (props: any) => (
        <Text color="tertiary">x{Number(props.getValue())}</Text>
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
      cell: (props: any) => (
        <Text>{getOrderStatusText(props.getValue(), t)}</Text>
      ),
    },
    {
      flex: 1,
      // accessorKey: "id",
      accessorFn: (row: any) => {
        return { id: row.id, status: row.status };
      },
      header: "Cancel",
      cell: (props: any) => {
        const status = props.getValue()?.status;
        const orderId = props.getValue()?.id;
        const isCanceling = cancelingOrders.includes(orderId);
        return (
          <>
            {status === OrderStatus.ORDER_STATUS_OPEN && (
              <Button
                variant="error"
                size="xs"
                disabled={isCanceling}
                onClick={() => {
                  setCancelingOrders([...cancelingOrders, orderId]);
                  if (
                    address &&
                    orderId?.number &&
                    orderId?.marginAccountAddress
                  ) {
                    cancelOrder({
                      address,
                      orderId,
                      memo: `Cancel order #${orderId.number}`,
                    })
                      .then(() => {
                        successAlert("Order canceled successfully");
                        setCancelingOrders(co =>
                          co.filter(o => o.number !== orderId.number)
                        );
                      })
                      .catch(error => {
                        console.error(error);
                        setCancelingOrders(co =>
                          co.filter(o => o.number !== orderId.number)
                        );
                      });
                  }
                }}
              >
                {isCanceling ? "Canceling..." : "Cancel"}
              </Button>
            )}
          </>
        );
      },
    },
  ];

  // if (!openOrders.length) {
  // if (!sortedOrders.length) {
  if (totalOrders === 0) {
    return <PlaceHolder>No Orders yet</PlaceHolder>;
  }
  return (
    <>
      <Table
        columns={columns}
        // data={openOrders}
        data={orders}
        headerStyle={{ backgroundColor: "#031a28" }}
      />
      <Pagination
        page={page}
        setPage={setPage}
        totalItems={totalOrders}
        pageSize={pageSize}
      />
    </>
  );
};

export default PendingOrders;
