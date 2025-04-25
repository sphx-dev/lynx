import { Table, Text } from "@/components";
import { Modal } from "@/components/Modal/Modal";
import config from "@/config";
import { formatDollars } from "@/utils/format";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import styled from "styled-components";
// TODO: Uncoment when hash is available in DB
// import { Link } from "react-router-dom";
import { LoaderBar } from "@/components/LoaderBar";
import { useEffect, useState } from "react";
import { Pagination } from "@/components/Pagination";
import { TableRowMarket } from "@/components/Table/TableRowMarket";

//
const queryPostionsDetails = async ({
  queryKey,
}: {
  queryKey: readonly unknown[];
}) => {
  const [, accountId, symbol, page, pageSize] = queryKey;
  const response = await fetch(
    config.VITE_API_URL +
      `/positions/details?account_id=${accountId}&symbol=${symbol}&page=${page}&page_size=${pageSize}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const useQueryPositionsDetails = (
  accountId: string | undefined,
  symbol: string | undefined,
  page: number = 0,
  pageSize: number = 10
) => {
  return useQuery(
    ["query-positions-details", accountId, symbol, page, pageSize],
    queryPostionsDetails,
    {
      enabled: !!accountId && !!symbol,
      staleTime: 1000 * 60 * 1, // 1 minute
      refetchInterval: 2000,
    }
  );
};

const PAGE_SIZE = 10;

export const ModalPositionDetails = ({
  isOpen,
  onClose,
  accountId,
  symbol,
}: {
  isOpen: boolean;
  onClose: () => void;
  accountId: string | undefined;
  symbol: string | undefined;
}) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (isOpen) {
      setPage(0);
    }
  }, [isOpen]);
  const { data, isFetching } = useQueryPositionsDetails(
    accountId,
    symbol,
    page,
    PAGE_SIZE
  );
  const orders = data?.orders || [];
  const total = data?.total || 0;
  const positionDetailsColumns = usePositionDetailsColumns();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <Text variant="textMedium" as="h2">
          {t("positionDetails")}
        </Text>
        <LoaderBar style={{ visibility: isFetching ? "visible" : "hidden" }} />
        <Table
          data-testid="perpetual-positions-table"
          columns={positionDetailsColumns}
          data={orders}
        />
        <Pagination
          page={page}
          setPage={setPage}
          totalItems={total}
          pageSize={PAGE_SIZE}
        />
      </ModalContent>
    </Modal>
  );
};

const ModalContent = styled.div`
  min-width: 600px;
  height: 100%;
`;

export const usePositionDetailsColumns = () => {
  const { t } = useTranslation();

  return [
    {
      accessorKey: "symbol",
      header: "", //t("ticker"),
      // cell: (props: any) => <Text color="tertiary">{props.getValue()}</Text>,
      cell: TableRowMarket,
    },
    {
      accessorKey: "timestamp",
      header: t("date"),

      cell: (props: any) => (
        <Text variant="textXSmall">
          {dayjs(props.getValue()).format("YYYY-MM-DD HH:mm:ss")}
        </Text>
      ),
    },
    {
      accessorKey: "side",
      header: t("side"),
      cell: (props: any) => (
        <Text color={props.getValue() === "buy" ? "bull" : "bear"}>
          {props.getValue()}
        </Text>
      ),
    },
    {
      accessorKey: "type",
      header: t("type"),
      cell: (props: any) => (
        <Text variant="textXSmall">{t(props.getValue())}</Text>
      ),
    },
    {
      accessorKey: "executed_quantity",
      header: t("size"),
      cell: (props: any) => (
        <Text variant="textXSmall">{props.getValue()}</Text>
      ),
    },
    {
      accessorKey: "price",
      header: t("price"),
      cell: (props: any) => (
        <Text variant="textXSmall">{formatDollars(props.getValue())}</Text>
      ),
    },
    // {
    //   accessorKey: "trigger_price",
    //   header: t("trigger_price"),
    //   cell: (props: any) => <Text variant="textXSmall">{props.getValue()}</Text>,
    // },
    {
      accessorKey: "leverage",
      header: t("lev."),
      cell: (props: any) => (
        <Text variant="textXSmall">x{props.getValue()}</Text>
      ),
    },
    {
      accessorKey: "order_type",
      header: t("order_type"),
      cell: (props: any) => (
        <Text variant="textXSmall">{t(props.getValue())}</Text>
      ),
    },
    // TODO: Uncoment when hash is available in DB
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
};

// TODO: Uncoment when hash is available in DB
// const HashLink = styled(Link)`
//   text-decoration: none;
//   color: var(--text-secondary-link);
//   font-size: 17px;
//   line-height: 4px;
// `;
