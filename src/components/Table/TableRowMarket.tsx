import { getIconByTicker } from "@/hooks/useMarkets";
import Text from "../Text";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export const TableRowMarket = (props: any) => {
  const { t } = useTranslation();
  const isLong = props.row.original.volume > 0;

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <img
        src={getIconByTicker(props.getValue()).icon}
        width={28}
        height={28}
        alt={props.getValue()}
      />
      <Column>
        <Text variant="textXSmall">{t(props.getValue() || "")}</Text>
        <Text variant="textXSmall" color={isLong ? "bull" : "bear"}>
          {isLong ? t("LONG") : t("SHORT")}
        </Text>
      </Column>
    </div>
  );
};

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
`;
