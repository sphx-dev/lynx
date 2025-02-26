import { useMemo, useState } from "react";
import { Text, Table } from "../../components";
import { getOrderStatusText, getOrderTypeText, getSideColor } from "./helpers";
import PlaceHolder from "./PlaceHolder";
import { formatDollars } from "../../utils/format";
import { useTranslation } from "react-i18next";
import { useChainCosmoshub } from "@/hooks/useChainCosmoshub";
import { useMarginAccount } from "@/hooks/useMarginAccounts";
import { useOrders } from "@/hooks/useOrders";
import {
  OrderStatus,
  ValidatedOrder,
} from "proto-codecs/codegen/sphx/order/validated_order";
import { OrderSide } from "proto-codecs/codegen/sphx/order/order";
import { Side } from "@/types/order";
import { Pagination } from "@/components/Pagination";
import { useMarkets } from "@/hooks/useMarkets";
import dayjs from "dayjs";
import { PRECISION } from "@/constants";
import { ReloadButton } from "./components/ReloadButton";
import { LoaderBar } from "@/components/LoaderBar";

const OrdersHistory = () => {
  const { address } = useChainCosmoshub();
  const { selectedAddress } = useMarginAccount(address);

  const columns = useOrdersHistoryColumns();

  const [page, setPage] = useState<number>(0);
  const {
    orders: originalOrders,
    totalOrders,
    pageSize,
    refetch,
    isFetching,
  } = useOrders(selectedAddress, page, [
    OrderStatus.ORDER_STATUS_CANCELED,
    OrderStatus.ORDER_STATUS_FILLED,
    OrderStatus.ORDER_STATUS_EXPIRED,
    OrderStatus.ORDER_STATUS_PARTIALLY_FILLED,
  ]);
  const orders = originalOrders.toReversed();

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
      <Table columns={columns} data={orders} />
      <Pagination
        page={page}
        setPage={setPage}
        totalItems={totalOrders}
        pageSize={pageSize}
      />
    </>
  );
};

export default OrdersHistory;

const useOrdersHistoryColumns = () => {
  const { t } = useTranslation();
  const { markets } = useMarkets();
  const marketMap = useMemo(() => {
    const map = new Map();
    markets.forEach(m => {
      map.set(m.id, t(m.baseAsset) + "/" + t(m.quoteAsset));
    });
    return map;
  }, [markets, t]);

  return [
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
      accessorKey: "orderType",
      header: "Type",
      cell: (props: any) => (
        <Text color="tertiary">{getOrderTypeText(props.getValue(), t)}</Text>
      ),
    },
    {
      // accessorKey: "quantity",
      accessorFn: (order: ValidatedOrder) => {
        return (
          order?.fills?.reduce((acc, fill) => {
            return acc + Number(fill.quantity);
          }, 0) || 0
        );
        // return order.quantity;
      },
      header: "Exec. Size",
      cell: (props: any) => (
        <Text color="tertiary">{Number(props.getValue()) / PRECISION}</Text>
      ),
    },
    {
      // accessorKey: "price",
      accessorFn: (order: ValidatedOrder) => {
        let totalQuantity = 0n;

        let accPrice =
          order?.fills?.reduce((acc, fill) => {
            totalQuantity += BigInt(fill.quantity);
            return acc + BigInt(fill.quantity) * BigInt(fill.price);
          }, 0n) || 0n;

        return Number((accPrice / totalQuantity).toString()) / PRECISION;

        // if (order.orderType === OrderType.ORDER_TYPE_MARKET) {
        //   return t("marketPrice");
        // }
        // return formatPrice(Number(order.price) / PRECISION, 2);
      },
      header: "Exec. Price",
      cell: (props: any) => (
        <Text color="tertiary">
          {/* {props.getValue()}/{formatPrice(Number(props.getValue()), 2)}/ */}
          {formatDollars(Number(props.getValue()))}
        </Text>
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
  ];
};
