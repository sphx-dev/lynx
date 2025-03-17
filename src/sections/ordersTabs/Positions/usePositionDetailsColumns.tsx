import { Table, Text } from "@/components";
import { Modal } from "@/components/Modal/Modal";
import config from "@/config";
import { formatDollars } from "@/utils/format";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getSideTextColor } from "../helpers";
import { Side } from "@/types/order";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LoaderBar } from "@/components/LoaderBar";

//
const queryPostionsDetails = async ({
  queryKey,
}: {
  queryKey: readonly unknown[];
}) => {
  const [, accountId, symbol] = queryKey;
  const response = await fetch(
    config.VITE_API_URL +
      `/positions/details?account_id=${accountId}&symbol=${symbol}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const useQueryPositionsDetails = (
  accountId: string | undefined,
  symbol: string | undefined
) => {
  return useQuery(
    ["query-positions-details", accountId, symbol],
    queryPostionsDetails,
    {
      enabled: !!accountId && !!symbol,
      staleTime: 1000 * 60 * 1, // 1 minute
      refetchInterval: 2000,
    }
  );
};

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
  const { data, isFetching } = useQueryPositionsDetails(accountId, symbol);
  const positionDetailsColumns = usePositionDetailsColumns();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <H2Modal>Position Details</H2Modal>
        <LoaderBar style={{ visibility: isFetching ? "visible" : "hidden" }} />
        <Table
          data-testid="perpetual-positions-table"
          columns={positionDetailsColumns}
          data={data || []}
        />
      </ModalContent>
    </Modal>
  );
};

const ModalContent = styled.div`
  min-width: 600px;
  height: 100%;
`;

const H2Modal = styled.h2`
  margin-bottom: 1rem;
`;

export const usePositionDetailsColumns = () => {
  const { t } = useTranslation();

  return [
    {
      accessorKey: "symbol",
      header: "", //t("ticker"),
      cell: (props: any) => <Text color="tertiary">{props.getValue()}</Text>,
    },
    {
      accessorKey: "timestamp",
      header: t("date"),

      cell: (props: any) => (
        <Text color="tertiary">
          {/* {new Date(props.getValue()).toLocaleString()} */}
          {dayjs(props.getValue()).format("YYYY-MM-DD HH:mm:ss")}
        </Text>
      ),
    },
    {
      accessorKey: "side",
      header: t("side"),
      cell: (props: any) => (
        <Text
          //   color="tertiary"
          color={getSideTextColor(
            props.getValue() === "buy" ? Side.Buy : Side.Sell
          )}
        >
          {props.getValue()}
        </Text>
      ),
    },
    {
      accessorKey: "type",
      header: t("type"),
      cell: (props: any) => <Text color="tertiary">{props.getValue()}</Text>,
    },
    {
      accessorKey: "executed_quantity",
      header: t("size"),
      cell: (props: any) => <Text color="secondary">{props.getValue()}</Text>,
    },
    {
      accessorKey: "price",
      header: t("price"),
      cell: (props: any) => (
        <Text color="primary">{formatDollars(props.getValue())}</Text>
      ),
    },
    // {
    //   accessorKey: "trigger_price",
    //   header: t("trigger_price"),
    //   cell: (props: any) => <Text color="tertiary">{props.getValue()}</Text>,
    // },
    {
      accessorKey: "leverage",
      header: t("lev."),
      cell: (props: any) => <Text color="tertiary">x{props.getValue()}</Text>,
    },
    {
      accessorKey: "order_type",
      header: t("order_type"),
      cell: (props: any) => <Text color="tertiary">{t(props.getValue())}</Text>,
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
};

const HashLink = styled(Link)`
  text-decoration: none;
  color: var(--text-secondary-link);
  font-size: 17px;
  line-height: 4px;
`;
