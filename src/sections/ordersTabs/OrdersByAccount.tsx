import { useMemo, useState } from "react";

import { Table, Text, Button } from "../../components";
import { getOrderStatusText, getSideTextColor } from "./helpers";
import PlaceHolder from "./PlaceHolder";
import { useChainCosmoshub } from "../../hooks/useChainCosmoshub";
import { useMarginAccount } from "../../hooks/useMarginAccounts";
import { useCancelOrder, useCancelOrderSmart } from "../../hooks/useOrders";
import { OrderId } from "proto-codecs/codegen/sphx/order/order";
import { Side } from "../../types/order";
import { useTranslation } from "react-i18next";
import { errorAlert, successAlert } from "@/utils/alerts";
import { useMarkets } from "../../hooks/useMarkets";
import dayjs from "dayjs";
import { OrderStatus } from "proto-codecs/codegen/sphx/order/validated_order";
import { Pagination } from "@/components/Pagination";
import { PRECISION } from "@/constants";
import { formatDollars } from "@/utils/format";
import { useSmartSign } from "@/components/SmartSignButton";
import { ReloadButton } from "./components/ReloadButton";
import { LoaderBar } from "@/components/LoaderBar";
import { useQuery } from "react-query";
import config from "@/config";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Modal } from "@/components/Modal/Modal";
import { OsirisOrder } from "./OsirisOrder";

const FF_SMART_SIGN = false;

const queryOrdersByAccount = async ({
  queryKey,
}: {
  queryKey: readonly unknown[];
}) => {
  const [, address, page, pageSize, isFinal] = queryKey;
  const response = await fetch(
    config.VITE_API_URL +
      `/order/query?margin_account=${address}&page=${page}&page_size=${pageSize}&is_final=${isFinal}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const useOrderColumns = ({
  openPartialsModal,
  setPartialOrders,
}: {
  openPartialsModal: () => void;
  setPartialOrders: (orders: any[]) => void;
}) => {
  const { t } = useTranslation();
  const { markets } = useMarkets();
  const marketMap = useMemo(() => {
    const map = new Map();
    markets.forEach(m => {
      map.set(m.id, t(m.baseAsset) + "/" + t(m.quoteAsset));
    });
    return map;
  }, [markets, t]);

  const { smartSign } = useSmartSign();

  const { cancelOrder } = useCancelOrder();
  const { cancelOrder: cancelOrderSmart } = useCancelOrderSmart();

  const { address } = useChainCosmoshub();

  const [cancellingOrders, setCancellingOrders] = useState<OrderId[]>([]);

  const addCancellingOrder = (orderId: OrderId) => {
    setCancellingOrders([...cancellingOrders, orderId]);
  };
  const removeCancellingOrder = (orderId: OrderId) => {
    setCancellingOrders(co => co.filter(o => o.number !== orderId.number));
  };

  const columns = [
    {
      accessorKey: "market_id",
      header: t("market"),
      cell: (props: any) => (
        <Text color="tertiary">{marketMap.get(BigInt(props.getValue()))}</Text>
      ),
    },
    {
      flex: 1,
      accessorKey: "timestamp",
      header: t("date"),
      cell: (props: any) => (
        <Text color="tertiary">
          {!dayjs(Date.now()).isSame(dayjs(new Date(props.getValue())), "day")
            ? dayjs(new Date(props.getValue())).format("YYYY-MM-DD HH:mm:ss")
            : dayjs(new Date(props.getValue())).format("HH:mm:ss")}
        </Text>
      ),
    },
    {
      accessorKey: "quantity",
      header: t("size"),
      cell: (props: any) => (
        <Text color="tertiary">{Number(props.getValue()) / PRECISION}</Text>
      ),
    },
    // {
    //   accessorFn: (order: ValidatedOrder) => {
    //     return order;
    //   },
    //   header: "Pending Size",
    //   cell: (props: any) => {
    //     const order = props.getValue();
    //     const fills = order.fills;
    //     const pendingSize = fills?.reduce(
    //       (acc: number, fill: any) => acc + Number(fill.quantity),
    //       0
    //     );
    //     const quantity = order.quantity;
    //     return (
    //       <Text color="tertiary">
    //         {(Number(quantity) - Number(pendingSize)) / PRECISION}
    //       </Text>
    //     );
    //   },
    // },
    {
      // accessorKey: "price",
      accessorFn: (order: any) => {
        // if order is canceled, return —
        if (order.is_canceled) {
          return "—";
        }
        if (
          order.order_type ===
          "ORDER_TYPE_MARKET" /*OrderType.ORDER_TYPE_MARKET*/
        ) {
          return t("marketPrice");
        }
        return formatDollars(Number(order.price) / PRECISION, "");
      },
      header: t("Req. Price"),
      cell: (props: any) => <Text color="tertiary">{props.getValue()}</Text>,
    },
    // {
    //   // accessorKey: "price",
    //   accessorFn: (order: ValidatedOrder) => {
    //     const fills = order.fills;
    //     let total = fills?.reduce(
    //       (acc: bigint, fill: any) =>
    //         acc + BigInt(fill.quantity) * BigInt(fill.price),
    //       0n
    //     );
    //     const totalQuantity = fills?.reduce(
    //       (acc: bigint, fill: any) => acc + BigInt(fill.quantity),
    //       0n
    //     );
    //     if (
    //       order.orderType === OrderType.ORDER_TYPE_MARKET &&
    //       fills.length === 0
    //     ) {
    //       return t("marketPrice");
    //     }
    //     if (totalQuantity > 0n) {
    //       total = total / totalQuantity;
    //     }
    //     return formatDollars(Number(total.toString()) / PRECISION, "");
    //     // return formatDollars(Number(order.price) / PRECISION, "");
    //     // return formatPrice(Number(order.price) / PRECISION, 2);
    //   },
    //   header: "Actual Price",
    //   cell: (props: any) => <Text color="tertiary">{props.getValue()}</Text>,
    // },
    {
      accessorKey: "leverage",
      header: t("lev."),
      cell: (props: any) => (
        <Text color="tertiary">x{Number(props.getValue())}</Text>
      ),
    },
    {
      accessorKey: "side",
      header: t("side"),
      cell: (props: any) => (
        <Text
          color={getSideTextColor(
            props.getValue() === "ORDER_SIDE_BUY" ? Side.Buy : Side.Sell
          )}
        >
          {props.getValue() === "ORDER_SIDE_BUY" ? "buy" : "sell"}
        </Text>
      ),
    },
    {
      accessorFn: (order: any) => {
        if (order.is_final) {
          return {
            status: OrderStatus.ORDER_STATUS_FILLED,
            hash: order.final_tx_hash,
          };
        }
        if (order.is_canceled) {
          return {
            status: OrderStatus.ORDER_STATUS_CANCELED,
            hash: order.canceled_tx_hash,
          };
        }
        if (order?.subData?.length > 0) {
          return { status: OrderStatus.ORDER_STATUS_PARTIALLY_FILLED };
        }
        return { status: OrderStatus.ORDER_STATUS_OPEN };
      },
      header: t("status"),
      cell: (props: any) => (
        <>
          {props.getValue().hash ? (
            <Text>
              <ExplorerLink to={props.getValue().hash} target="_blank">
                {getOrderStatusText(props.getValue().status, t)}
              </ExplorerLink>
            </Text>
          ) : (
            <Text>{getOrderStatusText(props.getValue().status, t)}</Text>
          )}
        </>
      ),
    },

    {
      accessorKey: "hash",
      header: t("tx"),
      cell: (props: any) => (
        <Text>
          <HashLink
            to={config.VITE_EXPLORER_URL + "/transactions/" + props.getValue()}
            target="_blank"
          >
            {/* 🔗 */}⧉
          </HashLink>
        </Text>
      ),
    },

    {
      flex: 1,
      // accessorKey: "id",
      accessorFn: (row: any) => {
        return {
          id: {
            number: row.order_id_chain,
            marginAccountAddress: row.margin_account_address,
          },
          status: getStatusByMessage(row),
          row,
        };
      },
      header: t("action"),
      cell: (props: any) => {
        const status = props.getValue()?.status;
        const orderId = props.getValue()?.id;
        const isCancelling = cancellingOrders.some(
          o => o.number === orderId.number
        );
        const onClickHandler = async () => {
          const row = props.getValue()?.row;
          console.log("row", row);
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
            {status === OrderStatus.ORDER_STATUS_FILLED && (
              <Button
                color="secondary"
                size="xs"
                onClick={() => {
                  setPartialOrders(props.getValue().row.subData);
                  openPartialsModal();
                }}
              >
                {t("details")} ({props.getValue()?.row?.subData?.length})
              </Button>
            )}
            {status === OrderStatus.ORDER_STATUS_PARTIALLY_FILLED && (
              <Button
                color="secondary"
                size="xs"
                onClick={() => {
                  setPartialOrders(props.getValue()?.row?.subData);
                  openPartialsModal();
                }}
              >
                {t("partials")} ({props.getValue()?.row?.subData?.length})
              </Button>
            )}
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

  return columns;
};

const useNestedOrderColumns = () => {
  const { t } = useTranslation();
  const nestedColumns = [
    {
      accessorKey: "order_type",
      header: t("Order Type"),
      cell: (props: any) => (
        <Text color="tertiary">
          {props.getValue() === "ORDER_TYPE_LIMIT" ? t("limit") : t("market")}
        </Text>
      ),
    },

    {
      accessorKey: "quantity",
      header: t("size"),
      cell: (props: any) => (
        <Text color="tertiary">{Number(props.getValue()) / PRECISION}</Text>
      ),
      footer: (info: any) => {
        const data = info?.table?.options?.data;
        const total = data?.reduce(
          (acc: number, item: any) => acc + Number(item.quantity / PRECISION),
          0
        );
        if (!data) {
          return null;
        }
        return `Total: ${total}`;
      },
    },
    {
      accessorKey: "price",
      header: t("price"),
      cell: (props: any) => (
        <Text color="tertiary">
          {formatDollars(Number(props.getValue()) / PRECISION, "")}
        </Text>
      ),
      footer: (info: any) => {
        const data = info?.table?.options?.data;
        const totalQuantity = data?.reduce(
          (acc: number, item: any) => acc + Number(item.quantity / PRECISION),
          0
        );
        const totalPrice = data?.reduce(
          (acc: number, item: any) =>
            acc +
            Number(item.quantity / PRECISION) * Number(item.price / PRECISION),
          0
        );
        if (!data) {
          return null;
        }
        return `Avg. ${formatDollars(totalPrice / totalQuantity)} `;
      },
    },
    {
      accessorKey: "leverage",
      header: t("lev."),
      cell: (props: any) => (
        <Text color="tertiary">x{Number(props.getValue())}</Text>
      ),
    },
    {
      accessorKey: "timestamp",
      header: t("date"),
      cell: (props: any) => (
        <Text color="tertiary">
          {dayjs(new Date(props.getValue())).format("YYYY-MM-DD HH:mm:ss")}
        </Text>
      ),
    },
    {
      accessorKey: "hash",
      header: t("tx"),
      cell: (props: any) => (
        <Text>
          <HashLink
            to={config.VITE_EXPLORER_URL + "/transactions/" + props.getValue()}
            target="_blank"
          >
            {/* 🔗 */}⧉
          </HashLink>
        </Text>
      ),
    },
  ];

  return nestedColumns;
};

const OrdersByAccount = ({ final = false }) => {
  const { address } = useChainCosmoshub();
  const { selectedAddress } = useMarginAccount(address);

  const [page, setPage] = useState<number>(0);

  const pageSize = 10;
  const isFinal = final;
  const { data, isFetching, refetch } = useQuery(
    ["query-orders", selectedAddress, page, pageSize, isFinal],
    queryOrdersByAccount,
    {
      enabled: !!selectedAddress,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchInterval: 5000,
    }
  );

  const totalOrders = data?.total ?? 0;
  const orders =
    data?.orders?.map((response: OsirisOrder) => ({
      ...response.order,
      subData: response?.partials,
    })) ?? [];

  const [isPartialsModalOpen, setIsPartialsModalOpen] = useState(false);
  const handleClosePartialsModal = () => {
    setIsPartialsModalOpen(false);
  };
  const [partialOrders, setPartialOrders] = useState<any[]>([]);
  const columns = useOrderColumns({
    openPartialsModal: () => setIsPartialsModalOpen(true),
    setPartialOrders,
  });

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
      <PartialsModal
        partialOrders={partialOrders}
        isOpen={isPartialsModalOpen}
        onClose={handleClosePartialsModal}
      />
      <LoaderBar style={{ visibility: isFetching ? "visible" : "hidden" }} />
      <ReloadButton onClick={() => refetch()} />
      <Table
        columns={columns}
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

export default OrdersByAccount;

const ExplorerLink = styled(Link)`
  color: var(--text-secondary-link);
`;

const HashLink = styled(Link)`
  text-decoration: none;
  color: var(--text-secondary-link);
  font-size: 17px;
  line-height: 4px;
`;

function getStatusByMessage(msg: any) {
  if (msg.is_final) {
    return OrderStatus.ORDER_STATUS_FILLED;
  }
  if (msg.is_canceled) {
    return OrderStatus.ORDER_STATUS_CANCELED;
  }
  if (msg?.subData?.length > 0) {
    return OrderStatus.ORDER_STATUS_PARTIALLY_FILLED;
  }
  return OrderStatus.ORDER_STATUS_OPEN;
}

const PartialsModal = ({
  partialOrders,
  isOpen,
  onClose,
}: {
  partialOrders: any[];
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div style={{ minWidth: "500px", minHeight: "150px" }}>
        <Table
          columns={useNestedOrderColumns()}
          data={partialOrders}
          headerStyle={{
            backgroundColor: "transparent",
          }}
        />
      </div>
    </Modal>
  );
};
