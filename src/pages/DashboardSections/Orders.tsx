import { useMarkets } from "@/hooks/useMarkets";
import { Title } from "./styled";
import { useOrderBookData } from "@/sections/orderbook/useOrderBookData";
import styled from "styled-components";
import { useCallback, useMemo } from "react";
import { formatDollars } from "@/utils/format";
import VirtualScroll from "./VirtualScroll";
import { useTranslation } from "react-i18next";

const MAX_ROWS = 100000;
const ROW_HEIGHT = 25;

export const Orders = () => {
  const { t } = useTranslation();
  const { selectedMarket } = useMarkets();
  const { data } = useOrderBookData({ ticker: selectedMarket?.ticker });

  const [asks, asksTotalQuantity] = useMemo(() => {
    let asks = data?.asks ?? [];
    if (!asks) return [];
    asks = asks.toReversed();

    let len = Math.min(MAX_ROWS, asks.length);
    let asksSizeSum = 0;
    let asksQuantitySum = 0;
    for (let i = 0; i < len; i++) {
      let price = Number(asks[i].price);
      if (asks[i] && !isNaN(price)) {
        asks[i].price = price;
        asks[i].quantity = Number(asks[i].quantity);
        asks[i].amount = Number(asks[i].quantity) * Number(asks[i].price);
        asksSizeSum += Number(asks[i].quantity) * Number(asks[i].price);
        asks[i].amountSum = asksSizeSum;
        asksQuantitySum += Number(asks[i].quantity);
        asks[i].quantitySum = asksQuantitySum;
      }
    }
    return [asks, asks[len - 1]?.quantitySum];
  }, [data]);

  const [bids, bidsTotalQuantity] = useMemo(() => {
    let bids = data?.bids ?? [];
    if (!bids) return [];
    bids = bids.toReversed();

    let len = Math.min(MAX_ROWS, bids.length);
    let bidsSizeSum = 0;
    let bidsQuantitySum = 0;
    for (let i = 0; i < len; i++) {
      let price = Number(bids[i].price);
      if (bids[i] && !isNaN(price)) {
        bids[i].price = price;
        bids[i].quantity = Number(bids[i].quantity);
        bids[i].amount = Number(bids[i].quantity) * Number(bids[i].price);
        bidsSizeSum += Number(bids[i].quantity) * Number(bids[i].price);
        bids[i].amountSum = bidsSizeSum;
        bidsQuantitySum += Number(bids[i].quantity);
        bids[i].quantitySum = bidsQuantitySum;
      }
    }

    return [bids, bids[len - 1]?.quantitySum];
  }, [data]);

  const rows = useMemo(() => {
    let result = [];
    let len = Math.min(MAX_ROWS, Math.max(asks.length, bids.length));

    for (let i = 0; i < len; i++) {
      result.push({
        id:
          asks[i] && bids[i] ? "a-" + asks[i].price + "/b-" + bids[i].price : i,
        ask: asks[i],
        bid: bids[i],
      });
    }

    return result;
  }, [asks, bids]);

  const renderRow = useCallback(
    (rowIndex: number) => {
      let row = rows[rowIndex];
      if (!row) return null;

      let asksPercentage = (row?.ask?.quantitySum / asksTotalQuantity) * 50;
      asksPercentage = isNaN(asksPercentage) ? 0 : asksPercentage;

      let bidsPercentage = (row?.bid?.quantitySum / bidsTotalQuantity) * 50;
      bidsPercentage = isNaN(bidsPercentage) ? 0 : bidsPercentage;

      return (
        <TR
          key={rows[rowIndex]?.id}
          style={{
            // Ignored css variables to be checked by TS
            // @ts-ignore-next-line
            "--a": asksPercentage + "%",
            // @ts-ignore-next-line
            "--b": bidsPercentage + "%",
          }}
        >
          <TD>{rows[rowIndex]?.ask?.quantitySum?.toFixed(2)}</TD>
          <TD>{rows[rowIndex]?.ask?.quantity}</TD>
          <TD style={{ color: "#d00000" }}>
            {rows[rowIndex]?.ask?.price
              ? formatDollars(Number(rows[rowIndex]?.ask?.price), "symbol")
              : ""}
          </TD>
          <TD style={{ color: "#00a000" }}>
            {rows[rowIndex]?.bid?.price
              ? formatDollars(rows[rowIndex]?.bid?.price, "symbol")
              : ""}
          </TD>
          <TD>{rows[rowIndex]?.bid?.quantity}</TD>
          <TD>{rows[rowIndex]?.bid?.quantitySum?.toFixed(2)}</TD>
        </TR>
      );
    },
    [rows, asksTotalQuantity, bidsTotalQuantity]
  );

  return (
    <div>
      <Title>{t("orderbook")}</Title>

      <TR style={{ marginRight: "16px" }}>
        <TH>{t("total")}</TH>
        <TH>{t("amount")}</TH>
        <TH>{t("price")}</TH>

        <TH>{t("price")}</TH>
        <TH>{t("amount")}</TH>
        <TH>{t("total")}</TH>
      </TR>
      <div
        style={{
          borderTop: "1px solid black",
          borderBottom: "1px solid black",
        }}
      >
        <VirtualScroll
          rowHeight={ROW_HEIGHT}
          totalItems={Math.min(MAX_ROWS, rows.length)}
          containerHeight={"calc(100vh - 250px)"}
          renderRow={renderRow}
        />
      </div>
      <SummaryRow>
        <div>
          {t("asks")} {data?.asks_size}
        </div>
        <div>
          {data?.bids_size} {t("bids")}
        </div>
      </SummaryRow>
    </div>
  );
};

const TR = styled.div`
  display: flex;
  justify-content: space-around;

  text-align: center;
  height: ${ROW_HEIGHT}px;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.fontStyles.monoRegular};

  background: linear-gradient(
    90deg,
    transparent calc(50% - var(--a)),
    #2f1515 calc(50% - var(--a)),
    #2f1515 50%,
    #1b4d3a 50%,
    #1b4d3a calc(50% + var(--b)),
    transparent calc(50% + var(--b))
  );
`;
const TH = styled.div`
  text-align: center;
  width: 20%;
  padding: 0 28px;
`;

const TD = styled.div`
  line-height: ${ROW_HEIGHT}px;
  text-align: center;
  width: 20%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;
  font-variant: small-caps;
  font-size: 14px;
  /* font-family: ${({ theme }) => theme.fonts.fontStyles.monoRegular}; */
`;
