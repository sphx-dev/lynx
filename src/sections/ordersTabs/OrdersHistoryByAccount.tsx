import { useCallback, useEffect, useState } from "react";
import { Table, Text } from "../../components";
import PlaceHolder from "./PlaceHolder";
import { useChainCosmoshub } from "../../hooks/useChainCosmoshub";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { Pagination } from "@/components/Pagination";
import { formatDollars } from "@/utils/format";
import { LoaderBar } from "@/components/LoaderBar";
import { useQuery } from "react-query";
import config from "@/config";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Modal } from "@/components/Modal/Modal";
import { PRECISION } from "@/constants";
import { RiShareBoxLine } from "@remixicon/react";
import { TableRowMarket } from "@/components/Table/TableRowMarket";
import { LinkButton } from "@/components/ButtonV2/LinkButton";
import { usePubSub } from "@/hooks/usePubSub";
import { RELOAD_ORDER_TABS } from "./OrderTabs";

const queryOrdersHistoryByAccount = async ({
  queryKey,
}: {
  queryKey: readonly unknown[];
}) => {
  const [, address, page, pageSize] = queryKey;
  const response = await fetch(
    config.VITE_API_URL +
      `/order/query_history?account_id=${address}&page=${page}&page_size=${pageSize}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const useOrderColumns = ({
  openPartialsModal,
  setSelectedOrderId,
}: {
  openPartialsModal: () => void;
  setSelectedOrderId: (orderId: string) => void;
}) => {
  const { t } = useTranslation();

  const columns = [
    {
      accessorKey: "symbol",
      header: t("Market"),
      cell: TableRowMarket,
    },

    {
      accessorKey: "timestamp",
      header: t("date"),
      cell: (props: any) => (
        <Text variant="textXSmall">
          {!dayjs(Date.now()).isSame(dayjs(new Date(props.getValue())), "day")
            ? dayjs(new Date(props.getValue())).format("HH:mm:ss")
            : dayjs(new Date(props.getValue())).format("YYYY-MM-DD")}
        </Text>
      ),
    },
    {
      accessorKey: "order_type",
      header: t("type"),
      cell: (props: any) => (
        <Text variant="textXSmall">{t(props.getValue())}</Text>
      ),
    },
    {
      accessorKey: "quantity",
      header: t("size"),
      cell: (props: any) => (
        <Text variant="textXSmall">{Number(props.getValue())}</Text>
      ),
    },
    {
      // accessorKey: "original_price",
      accessorFn: (order: any) => {
        if (order.order_type === "market") {
          return t("marketPrice");
        }
        return formatDollars(Number(order.original_price), "");
      },
      header: t("Orig. Price"),
      cell: (props: any) => (
        <Text variant="textXSmall">{props.getValue()}</Text>
      ),
    },
    {
      // accessorKey: "price",
      accessorFn: (order: any) => {
        // if order is canceled, return —
        if (Number(order.price) === 0) {
          return "—";
        }
        return formatDollars(Number(order.price) / PRECISION, "");
      },
      header: t("Price"),
      cell: (props: any) => (
        <Text variant="textXSmall">{props.getValue()}</Text>
      ),
    },
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
          color={props.getValue() === "buy" ? "bull" : "bear"}
        >
          {props.getValue() === "buy" ? "buy" : "sell"}
        </Text>
      ),
    },

    {
      accessorFn: (order: any) => {
        let label = "ORDER_STATUS_FILLED_OB";
        if (order?.hash) {
          label = "ORDER_STATUS_FILLED";
        }
        if (order.source === "partial") {
          label = "ORDER_STATUS_PARTIALLY_FILLED";
        }
        if (Number(order.price) === 0) {
          label = "ORDER_STATUS_CANCELED";
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

    {
      accessorKey: "hash",
      header: t("tx"),
      cell: (props: any) => (
        <Text variant="textXSmall">
          {props.getValue() && (
            <HashLink
              to={
                config.VITE_EXPLORER_URL + "/transactions/" + props.getValue()
              }
              target="_blank"
            >
              {/* 🔗 ⧉*/}
              <RiShareBoxLine style={{ width: "20px", height: "20px" }} />
            </HashLink>
          )}
        </Text>
      ),
    },

    {
      flex: 1,
      // accessorKey: "id",
      accessorFn: (row: any) => {
        console.log("row", row);
        return row;
      },
      header: t("action"),
      cell: (props: any) => {
        return (
          <>
            <LinkButton
              type="grey"
              size="small"
              onClick={() => {
                setSelectedOrderId(props.getValue()?.order_id);
                openPartialsModal();
              }}
            >
              {t("details")}
            </LinkButton>
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
        <Text variant="textXSmall">{t(props.getValue())}</Text>
      ),
    },

    {
      accessorKey: "quantity",
      header: t("size"),
      cell: (props: any) => {
        const size = Number(props.getValue());
        if (size === 0) {
          return <Text variant="textXSmall">{t("canceled")}</Text>;
        }
        return <Text variant="textXSmall">{size}</Text>;
      },
      footer: (info: any) => {
        const data = info?.table?.options?.data || [];
        const total = (data || [])?.reduce(
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
        <Text variant="textXSmall">
          {formatDollars(Number(props.getValue()), "")}
        </Text>
      ),
      footer: (info: any) => {
        const data = info?.table?.options?.data;
        const totalQuantity = (data || [])?.reduce(
          (acc: number, item: any) => acc + Number(item.quantity),
          0
        );
        const totalPrice = (data || [])?.reduce(
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
        <Text variant="textXSmall">x{Number(props.getValue())}</Text>
      ),
    },
    {
      accessorKey: "timestamp",
      header: t("date"),
      cell: (props: any) => (
        <Text variant="textXSmall">
          {dayjs(new Date(props.getValue())).format("YYYY-MM-DD HH:mm:ss")}
        </Text>
      ),
    },
    // TODO: activate when partial orders contain hash field
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
  ];

  return nestedColumns;
};

const OrdersHistoryByAccount = () => {
  const { address } = useChainCosmoshub();

  const [page, setPage] = useState<number>(0);

  const pageSize = 10;
  const { data, isFetching, refetch } = useQuery(
    ["query-orders-history", address, page, pageSize],
    queryOrdersHistoryByAccount,
    {
      enabled: !!address,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchInterval: 5000,
    }
  );

  const { subscribe, usnuscribe } = usePubSub();

  const refetchCallback = useCallback(
    (data: { page: string }) => {
      if (data.page !== "orderHistory") {
        return;
      }
      refetch();
    },
    [refetch]
  );

  subscribe(RELOAD_ORDER_TABS, refetchCallback);

  useEffect(() => {
    return () => {
      usnuscribe(RELOAD_ORDER_TABS, refetchCallback);
    };
  }, [refetchCallback, usnuscribe]);

  const totalOrders = data?.total ?? 0;
  const orders = data?.orders || [];

  const [isPartialsModalOpen, setIsPartialsModalOpen] = useState(false);
  const handleClosePartialsModal = () => {
    setIsPartialsModalOpen(false);
  };
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const columns = useOrderColumns({
    openPartialsModal: () => setIsPartialsModalOpen(true),
    setSelectedOrderId: setSelectedOrderId,
  });

  if (totalOrders === 0) {
    return (
      <>
        <LoaderBar style={{ visibility: isFetching ? "visible" : "hidden" }} />
        <PlaceHolder>No Orders yet</PlaceHolder>
      </>
    );
  }

  return (
    <>
      <PartialsModal
        orderId={selectedOrderId}
        isOpen={isPartialsModalOpen}
        onClose={handleClosePartialsModal}
      />
      <LoaderBar style={{ visibility: isFetching ? "visible" : "hidden" }} />
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

export default OrdersHistoryByAccount;

export const ExplorerLink = styled(Link)`
  color: var(--text-secondary-link);
`;

const HashLink = styled(Link)`
  text-decoration: none;
  color: var(--icon-sub-600);
`;

const PartialsModal = ({
  orderId = "",
  isOpen,
  onClose,
}: {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { data, isFetching } = useQuery(
    ["query-partials", orderId],
    () => getPartialsBy(orderId),
    {
      enabled: !!orderId,
    }
  );

  const partials = data?.partials || [];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div style={{ minWidth: "500px", minHeight: "150px" }}>
        {isFetching && <LoaderBar />}
        <Table
          columns={useNestedOrderColumns()}
          data={partials}
          headerStyle={{
            backgroundColor: "transparent",
          }}
        />
      </div>
    </Modal>
  );
};

async function getPartialsBy(chainOrderId: string) {
  let response = await fetch(
    config.VITE_API_URL +
      `/order/query_history/details?order_id=${chainOrderId}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}
