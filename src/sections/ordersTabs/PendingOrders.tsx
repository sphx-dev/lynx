import { useMemo, useState } from "react";

import { Table, Text, Button } from "../../components";
import { getOrderStatusText, getSideColor } from "./helpers";
import PlaceHolder from "./PlaceHolder";
import { useChainCosmoshub } from "../../hooks/useChainCosmoshub";
import { useMarginAccount } from "../../hooks/useMarginAccounts";
import {
  useCancelOrder,
  useCancelOrderSmart,
  useOrders,
} from "../../hooks/useOrders";
import {
  OrderId,
  OrderSide,
  OrderType,
} from "proto-codecs/codegen/sphx/order/order";
import { Side } from "../../types/order";
import { useTranslation } from "react-i18next";
import { errorAlert, successAlert } from "@/utils/alerts";
import { useMarkets } from "../../hooks/useMarkets";
import dayjs from "dayjs";
import {
  OrderStatus,
  ValidatedOrder,
} from "proto-codecs/codegen/sphx/order/validated_order";
import { Pagination } from "@/components/Pagination";
import { PRECISION } from "@/constants";
import { formatDollars } from "@/utils/format";
import { useSmartSign } from "@/components/SmartSignButton";
import { ReloadButton } from "./components/ReloadButton";
import { LoaderBar } from "@/components/LoaderBar";

const FF_SMART_SIGN = false;

const PendingOrders = () => {
  const { t } = useTranslation();
  const { address } = useChainCosmoshub();
  const { selectedAddress } = useMarginAccount(address);

  const { markets } = useMarkets();
  const marketMap = useMemo(() => {
    const map = new Map();
    markets.forEach(m => {
      map.set(m.id, t(m.baseAsset) + "/" + t(m.quoteAsset));
    });
    return map;
  }, [markets, t]);

  const [page, setPage] = useState<number>(0);

  const [cancellingOrders, setCancellingOrders] = useState<OrderId[]>([]);

  const addCancellingOrder = (orderId: OrderId) => {
    setCancellingOrders([...cancellingOrders, orderId]);
  };
  const removeCancellingOrder = (orderId: OrderId) => {
    setCancellingOrders(co => co.filter(o => o.number !== orderId.number));
  };

  const {
    orders: originalOrders,
    totalOrders,
    pageSize,
    refetch,
    isFetching,
  } = useOrders(selectedAddress, page, [
    OrderStatus.ORDER_STATUS_OPEN,
    OrderStatus.ORDER_STATUS_PARTIALLY_FILLED,
  ]);
  const orders = originalOrders.toReversed();

  const { smartSign } = useSmartSign();

  const { cancelOrder } = useCancelOrder();
  const { cancelOrder: cancelOrderSmart } = useCancelOrderSmart();

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
          {!dayjs(Date.now()).isSame(
            dayjs(Number(props.getValue()) * 1000),
            "day"
          )
            ? dayjs(Number(props.getValue()) * 1000).format("YYYY-MM-DD")
            : dayjs(Number(props.getValue()) * 1000).format("HH:mm:ss")}
        </Text>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Size",
      cell: (props: any) => (
        <Text color="tertiary">{Number(props.getValue()) / PRECISION}</Text>
      ),
    },
    {
      accessorFn: (order: ValidatedOrder) => {
        return order;
      },
      header: "Pending Size",
      cell: (props: any) => {
        const order = props.getValue();
        const fills = order.fills;
        const pendingSize = fills?.reduce(
          (acc: number, fill: any) => acc + Number(fill.quantity),
          0
        );
        const quantity = order.quantity;
        return (
          <Text color="tertiary">
            {(Number(quantity) - Number(pendingSize)) / PRECISION}
          </Text>
        );
      },
    },
    {
      // accessorKey: "price",
      accessorFn: (order: ValidatedOrder) => {
        if (order.orderType === OrderType.ORDER_TYPE_MARKET) {
          return t("marketPrice");
        }
        return formatDollars(Number(order.price) / PRECISION, "");
        // return formatPrice(Number(order.price) / PRECISION, 2);
      },
      header: "Req. Price",
      cell: (props: any) => <Text color="tertiary">{props.getValue()}</Text>,
    },
    {
      // accessorKey: "price",
      accessorFn: (order: ValidatedOrder) => {
        const fills = order.fills;
        let total = fills?.reduce(
          (acc: bigint, fill: any) =>
            acc + BigInt(fill.quantity) * BigInt(fill.price),
          0n
        );
        const totalQuantity = fills?.reduce(
          (acc: bigint, fill: any) => acc + BigInt(fill.quantity),
          0n
        );
        total = total / totalQuantity;
        if (
          order.orderType === OrderType.ORDER_TYPE_MARKET &&
          fills.length === 0
        ) {
          return t("marketPrice");
        }
        return formatDollars(Number(total.toString()) / PRECISION, "");
        // return formatDollars(Number(order.price) / PRECISION, "");
        // return formatPrice(Number(order.price) / PRECISION, 2);
      },
      header: "Actual Price",
      cell: (props: any) => <Text color="tertiary">{props.getValue()}</Text>,
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
      header: "Action",
      cell: (props: any) => {
        const status = props.getValue()?.status;
        const orderId = props.getValue()?.id;
        const isCancelling = cancellingOrders.some(
          o => o.number === orderId.number
        );
        const onClickHandler = async () => {
          if (address && orderId?.number && orderId?.marginAccountAddress) {
            try {
              addCancellingOrder(orderId);
              if (FF_SMART_SIGN && smartSign) {
                console.log("smartSign", orderId);
                let response = await cancelOrderSmart({
                  marginAccountAddress: orderId.marginAccountAddress,
                  number: orderId.number.toString(),
                });
                console.log("response", response);
                if (response.status === 200) {
                  successAlert("Order canceled successfully");
                } else {
                  errorAlert("Order cancel failed");
                }
              } else {
                await cancelOrder({
                  address,
                  orderId,
                  memo: `Cancel order #${orderId.number}`,
                });
                successAlert("Order canceled successfully");
              }
            } catch (error) {
              console.error(error);
            } finally {
              removeCancellingOrder(orderId);
            }
          }
        };

        return (
          <>
            {status === OrderStatus.ORDER_STATUS_OPEN && (
              <Button
                variant="error"
                size="xs"
                disabled={isCancelling}
                onClick={onClickHandler}
              >
                {isCancelling ? "Canceling..." : "Cancel"}
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
    return (
      <>
        <LoaderBar style={{ visibility: isFetching ? "visible" : "hidden" }} />
        <ReloadButton onClick={() => refetch()} />
        <PlaceHolder>No Orders yet</PlaceHolder>
      </>
    );
  }

  return (
    <>
      <LoaderBar style={{ visibility: isFetching ? "visible" : "hidden" }} />
      <ReloadButton onClick={() => refetch()} />
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
