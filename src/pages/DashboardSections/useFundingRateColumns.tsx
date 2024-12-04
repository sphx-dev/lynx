/**
 * funding rate logs columns
id
account_id
position_id
ticker
side
size
funding_rate
funding_amount
accumulated_funding
timestamp
 */

import { Text } from "@/components";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export function useFundingRateColumns() {
  const { t } = useTranslation();

  const columns = [
    {
      accessorKey: "ticker",
      header: t("market"),
      cell: (props: any) => {
        return <Text color="tertiary">{t(props.getValue())}</Text>;
      },
    },
    {
      accessorKey: "size",
      header: t("Qty"),
      cell: (props: any) => (
        <Text color="tertiary">
          {Number(props.getValue() || 0)
            .toFixed(10)
            .replace(/0+$/, "")}
        </Text>
      ),
    },
    {
      accessorKey: "funding_rate",
      header: t("Funding Rate"),
      cell: (props: any) => (
        <Text color="tertiary">
          {Number(props.getValue()).toFixed(10).replace(/0+$/, "")} %
        </Text>
      ),
    },
    {
      accessorKey: "funding_amount",
      header: t("Funding Amount"),
      cell: (props: any) => (
        <Text color="tertiary">
          {Number(props.getValue()).toFixed(10).replace(/0+$/, "")} USD
        </Text>
      ),
    },
    {
      accessorKey: "accumulated_funding",
      header: t("Accumulated Funding"),
      cell: (props: any) => (
        <Text color="tertiary">
          {Number(props.getValue()).toFixed(10).replace(/0+$/, "")} USD
        </Text>
      ),
    },
    {
      accessorKey: "side",
      header: t("Side"),
      cell: (props: any) => (
        <Text color={props.getValue().toLowerCase()}>
          <span style={{ textTransform: "capitalize" }}>
            {t(props.getValue())}
          </span>
        </Text>
      ),
    },
    {
      accessorKey: "timestamp",
      header: t("Timestamp"),
      cell: (props: any) => (
        <Text color="tertiary">
          {dayjs(new Date(props.getValue())).format("YYYY-MM-DD HH:mm:ss")}
        </Text>
      ),
    },
  ];

  return columns;
}
