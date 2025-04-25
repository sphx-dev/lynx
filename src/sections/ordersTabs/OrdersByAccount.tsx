import { useState } from "react";

import { Table, Text, Button } from "../../components";
import { getSideTextColor } from "./helpers";
import PlaceHolder from "./PlaceHolder";
import { useChainCosmoshub } from "../../hooks/useChainCosmoshub";
import { useCancelOrder, useCancelOrderSmart } from "../../hooks/useOrders";
import { useTranslation } from "react-i18next";
import { errorAlert, successAlert } from "@/utils/alerts";
import dayjs from "dayjs";
import { OrderStatus } from "proto-codecs/codegen/sphx/order/validated_order";
import { Pagination } from "@/components/Pagination";
import { formatDollars } from "@/utils/format";
import { useSmartSign } from "@/components/SmartSignButton";
import { ReloadButton } from "./components/ReloadButton";
import { LoaderBar } from "@/components/LoaderBar";
import { useQuery } from "react-query";
import config from "@/config";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Modal } from "@/components/Modal/Modal";
import { signArbitrary } from "@/utils/getOfflineSigner";
import { TableRowMarket } from "@/components/Table/TableRowMarket";

const FF_SMART_SIGN = false;

const queryOrdersByAccount = async ({
  queryKey,
}: {
  queryKey: readonly unknown[];
}) => {
  const [, address, page, pageSize] = queryKey;
  const response = await fetch(
    config.VITE_API_URL +
      `/order/query?account_id=${address}&page=${page}&page_size=${pageSize}`
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

  const { smartSign } = useSmartSign();

  const { cancelOrder } = useCancelOrder();
  const { cancelOrder: cancelOrderSmart } = useCancelOrderSmart();

  const { address } = useChainCosmoshub();

  const [cancellingOrders, setCancellingOrders] = useState<string[]>([]);

  const addCancellingOrder = (orderId: string) => {
    setCancellingOrders([...cancellingOrders, orderId]);
  };
  const removeCancellingOrder = (orderId: string) => {
    setCancellingOrders(co => co.filter(o => o !== orderId));
  };

  const columns = [
    {
      accessorKey: "symbol",
      header: t("Market"),
      cell: TableRowMarket,
    },
    {
      flex: 1,
      accessorKey: "timestamp",
      header: t("date"),
      cell: (props: any) => (
        <Text variant="textXSmall">
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
        <Text variant="textXSmall">{Number(props.getValue())}</Text>
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
        if (order.order_type === "market" /*OrderType.ORDER_TYPE_MARKET*/) {
          return t("marketPrice");
        }
        return formatDollars(Number(order.price), "");
      },
      header: t("Req. Price"),
      cell: (props: any) => (
        <Text variant="textXSmall">{props.getValue()}</Text>
      ),
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
        <Text variant="textXSmall">x{Number(props.getValue())}</Text>
      ),
    },
    {
      accessorKey: "side",
      header: t("side"),
      cell: (props: any) => (
        <Text
          variant="textXSmall"
          color={getSideTextColor(props.getValue() === "buy" ? "bull" : "bear")}
        >
          {props.getValue() === "buy" ? "buy" : "sell"}
        </Text>
      ),
    },
    /*{
      accessorFn: (order: any) => {
        if (order.is_final) {
          return {
            status: OrderStatus.ORDER_STATUS_FILLED,
            hash: order.final_tx_hash,
            label: order.final_tx_hash
              ? getOrderStatusText(OrderStatus.ORDER_STATUS_FILLED, t)
              : t("ORDER_STATUS_FILLED_OB"),
          };
        }
        if (order.is_canceled) {
          return {
            status: OrderStatus.ORDER_STATUS_CANCELED,
            hash: order.canceled_tx_hash,
            label: getOrderStatusText(OrderStatus.ORDER_STATUS_CANCELED, t),
          };
        }
        if (order?.subData?.length > 0) {
          return {
            status: OrderStatus.ORDER_STATUS_PARTIALLY_FILLED,
            label: getOrderStatusText(
              OrderStatus.ORDER_STATUS_PARTIALLY_FILLED,
              t
            ),
          };
        }
        return {
          status: OrderStatus.ORDER_STATUS_OPEN,
          label: getOrderStatusText(OrderStatus.ORDER_STATUS_OPEN, t),
        };
      },
      header: t("status"),
      cell: (props: any) => (
        <>
          {props.getValue().hash ? (
            <Text>
              <ExplorerLink
                to={
                  config.VITE_EXPLORER_URL +
                  "/transactions/" +
                  props.getValue().hash
                }
                target="_blank"
              >
                {props.getValue().label}
              </ExplorerLink>
            </Text>
          ) : (
            <Text>{props.getValue().label}</Text>
          )}
        </>
      ),
    },*/

    {
      accessorFn: (order: any) => {
        let label = "ORDER_STATUS_OPEN";
        if (order.source === "partial") {
          label = "ORDER_STATUS_PARTIALLY_FILLED";
        }
        return {
          label: label,
        };
      },
      header: t("status"),
      cell: (props: any) => (
        <Text variant="textXSmall">{t(props.getValue().label)}</Text>
      ),
    },

    // {
    //   accessorKey: "hash",
    //   header: t("tx"),
    //   cell: (props: any) => (
    //     <Text>
    //       <HashLink
    //         to={config.VITE_EXPLORER_URL + "/transactions/" + props.getValue()}
    //         target="_blank"
    //       >
    //         {/* 🔗 */}⧉
    //       </HashLink>
    //     </Text>
    //   ),
    // },

    {
      flex: 1,
      // accessorKey: "id",
      accessorFn: (row: any) => {
        console.log("row", row);
        return row;
      },
      header: t("action"),
      cell: (props: any) => {
        const order = props.getValue();

        const status = getStatusByMessage(order);
        const orderId = order.chain_order_id;
        const isCancelling = cancellingOrders.some(o => o === orderId);
        const onClickHandler = async () => {
          if (address) {
            try {
              addCancellingOrder(orderId);

              if (config.SIGNATURE_BASED_CANCEL) {
                const response = await cancelOrderSigned(address, order);
                if (response?.status === 200) {
                  successAlert("Order canceled successfully");
                } else {
                  errorAlert("Order cancel failed");
                }
              } else if (FF_SMART_SIGN && smartSign) {
                let response = await cancelOrderSmart({
                  marginAccountAddress: orderId.split(":")[0],
                  number: orderId.split(":")[1],
                });
                if (response.status === 200) {
                  successAlert("Order canceled successfully");
                } else {
                  errorAlert("Order cancel failed");
                }
              } else {
                await cancelOrder({
                  address,
                  orderId: {
                    marginAccountAddress: orderId.split(":")[0],
                    number: orderId.split(":")[1],
                  },
                  memo: `Cancel order #${orderId}`,
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
            {status === OrderStatus.ORDER_STATUS_FILLED &&
              (props.getValue()?.row?.subData?.length > 0 ? (
                <Button
                  color="secondary"
                  size="xs"
                  onClick={() => {
                    setPartialOrders(props.getValue()?.row?.subData || []);
                    openPartialsModal();
                  }}
                >
                  {t("details")} ({props.getValue()?.row?.subData?.length})
                </Button>
              ) : null)}

            {status === OrderStatus.ORDER_STATUS_PARTIALLY_FILLED &&
              (props.getValue()?.row?.subData?.length > 0 ? (
                <Button
                  color="secondary"
                  size="xs"
                  onClick={() => {
                    setPartialOrders(props.getValue()?.row?.subData || []);
                    openPartialsModal();
                  }}
                >
                  {t("partials")} ({props.getValue()?.row?.subData?.length})
                </Button>
              ) : null)}
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
        <Text color="tertiary">{Number(props.getValue())}</Text>
      ),
      footer: (info: any) => {
        const data = info?.table?.options?.data || [];
        const total = data?.reduce(
          (acc: number, item: any) => acc + Number(item.quantity),
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
          {formatDollars(Number(props.getValue()), "")}
        </Text>
      ),
      footer: (info: any) => {
        const data = info?.table?.options?.data;
        const totalQuantity = data?.reduce(
          (acc: number, item: any) => acc + Number(item.quantity),
          0
        );
        const totalPrice = data?.reduce(
          (acc: number, item: any) =>
            acc + Number(item.quantity) * Number(item.price),
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

const OrdersByAccount = () => {
  const { address } = useChainCosmoshub();

  const [page, setPage] = useState<number>(0);

  const pageSize = 10;
  const { data, isFetching, refetch } = useQuery(
    ["query-orders", address, page, pageSize],
    queryOrdersByAccount,
    {
      enabled: !!address,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchInterval: 5000,
    }
  );

  const totalOrders = data?.total ?? 0;
  const orders = data?.orders || [];
  // const orders =
  //   data?.orders?.map((response: OsirisOrder) => ({
  //     ...response.order,
  //     subData: response?.partials,
  //   })) ?? [];

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

export default OrdersByAccount;

export const ExplorerLink = styled(Link)`
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
  partialOrders = [],
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

async function cancelOrderSigned(address: string, order: any) {
  console.log("cancelOrderSigned", address, JSON.stringify(order));

  const id = order.order_id;

  const chainOrderId = order.chain_order_id;
  const cancelIntent = {
    id: `${id}`,
    chain_order_id: `${chainOrderId}`,
  };
  const signature = await signArbitrary(address, `{"id":"${chainOrderId}"}`);
  console.log("signature", signature, chainOrderId);
  if (!signature) {
    errorAlert("Failed to sign cancel order");
    return;
  }

  const response = await fetch(
    config.VITE_API_URL + "/order/" + id + "?ticker=" + order.symbol,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-ACCOUNT-ID": address,
      },
      body: JSON.stringify({
        ...cancelIntent,
        signature: signature.signature,
        pubkey: signature.pub_key.value,
      }),
    }
  );
  return response;
}
