import { useMemo, useState } from "react";
import { Text, Table } from "../../components";
import { getOrderStatusText, getSideColor } from "./helpers";
import PlaceHolder from "./PlaceHolder";
import { formatPrice } from "../../utils/format";
import { useTranslation } from "react-i18next";
import { useChainCosmoshub } from "@/hooks/useChainCosmoshub";
import { useMarginAccount } from "@/hooks/useMarginAccounts";
import { useOrders } from "@/hooks/useOrders";
import { OrderStatus } from "proto-codecs/codegen/sphx/order/validated_order";
import { OrderSide } from "proto-codecs/codegen/sphx/order/order";
import { Side } from "@/types/order";
import { Pagination } from "@/components/Pagination";
import { useMarkets } from "@/hooks/useMarkets";
import dayjs from "dayjs";

const ClosedOrders = () => {
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
  const { orders, totalOrders, pageSize } = useOrders(
    selectedAddress,
    page,
    OrderStatus.ORDER_STATUS_CANCELED
  );

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
        <Text color="tertiary">
          {formatPrice(Number(props.getValue()) / 1e6, 2)}
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

  if (totalOrders === 0) {
    return <PlaceHolder>No Orders yet</PlaceHolder>;
  }
  return (
    <>
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

export default ClosedOrders;
