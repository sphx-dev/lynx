import { Text } from "@/components";
import { formatNumber } from "@/utils/format";
import { OrderType } from "proto-codecs/codegen/sphx/order/order";
import { PerpetualPosition } from "proto-codecs/codegen/sphx/order/perpetual_position";
// import { PRECISION } from "@/constants";
import { useTranslation } from "react-i18next";
import { Tooltip } from "react-tooltip";
import React, { PropsWithChildren } from "react";
import { useLocalStreamingData } from "@/sections/chart/localStreaming";
import { Column, TableRowMarket } from "@/components/Table/TableRowMarket";
import { Button } from "@/components/ButtonV2/Button";
import { LinkButton } from "@/components/ButtonV2/LinkButton";

export const usePositionColumnsV2 = function (
  closePosition: (orderType: OrderType, position: PerpetualPosition) => void,
  showTpSl: (position: PerpetualPosition) => void,
  queryDetails: (symbol: string) => void
) {
  const { t } = useTranslation();

  return [
    {
      accessorKey: "symbol",
      header: "Market",
      // meta: {
      //   background: (props: any) => {
      //     if (props.row.original.volume > 0) {
      //       return `linear-gradient(90deg,var(--positive) 0,transparent 100%) 0px`;
      //     }
      //     if (props.row.original.volume < 0) {
      //       return `linear-gradient(90deg,var(--negative) 0,transparent 100%) 0px`;
      //     }
      //     return "";
      //   },
      // },
      cell: TableRowMarket,
    },
    {
      accessorKey: "volume",
      header: "Qty",
      cell: (props: any) => (
        <Text variant="textXSmall">
          {Math.abs(Number(props.getValue() || 0))}
        </Text>
      ),
    },
    {
      accessorKey: "entry_price",
      header: "Entry Price",
      cell: (props: any) => (
        <Text variant="textXSmall">
          {formatNumber({
            value: Math.abs(Number(props.getValue())),
            fixed: 3,
          })}
        </Text>
      ),
    },

    {
      accessorFn: (row: any) => {
        return Math.abs(Number(row.volume) * Number(row.entry_price));
      },
      header: "Value",
      cell: (props: any) => (
        <Text variant="textXSmall">
          {formatNumber({ value: props.getValue(), fixed: 8 })}
        </Text>
      ),
    },
    {
      accessorKey: "unrealizedPnL",
      HeaderWrapperComponent: React.memo(({ children }: PropsWithChildren) => {
        return (
          <>
            <Tooltip
              anchorSelect="#unrealizedPnLHeader"
              style={{
                backgroundColor: "#0a202c",
                boxShadow: "0 0 15px #000, 0 0 2px #000",
                fontWeight: "200",
              }}
            >
              <div
                style={{
                  width: "250px",
                  whiteSpace: "wrap",
                  textAlign: "justify",
                  fontSize: "12px",
                }}
              >
                {t("upnlHeaderInfo")}
              </div>
            </Tooltip>
            <span
              id="unrealizedPnLHeader"
              style={{
                display: "inline-block",
                cursor: "help",
                borderBottom: "1px dotted",
              }}
            >
              {children}
            </span>
          </>
        );
      }),
      accessorFn: (row: any) => {
        let size = Number(row.volume);
        let entryPrice = Number(row.entry_price);
        let symbol = row.symbol;

        return {
          size,
          entryPrice,
          ticker: symbol,
        };
      },
      header: "uPNL",
      cell: (props: any) => {
        const { size, entryPrice, ticker } = props.getValue();

        return (
          <UnrealizedPnL size={size} entryPrice={entryPrice} ticker={ticker} />
        );
      },
      width: "100px",
    },
    {
      header: "TP/SL",
      cell: (props: any) => {
        const position = props.row.original;
        const slOrderId = position?.slOrderId;
        const tpOrderId = position?.tpOrderId;
        const hasDetails =
          tpOrderId?.marginAccountAddress &&
          slOrderId?.marginAccountAddress &&
          tpOrderId?.number &&
          slOrderId?.number;
        return (
          <>
            {hasDetails && (
              <Button
                type="neutral"
                option="lighter"
                size="xxsmall"
                onClick={() => {
                  console.log("SHOW TP/SL", slOrderId, tpOrderId);
                  showTpSl(position);
                }}
              >
                Details
              </Button>
            )}
          </>
        );
      },
      // width: "100px",
    },
    /*{
      header: "Close By",
      cell: (props: any) => {
        const position = props.row.original;
        return (
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              gap: "2px",
              width: "75px",
            }}
          >
            <Button
              variant="secondary"
              size="xxsmall"
              data-testid={`close-position-market-${props.row.index}`}
              onClick={() => {
                closePosition(OrderType.ORDER_TYPE_MARKET, position);
              }}
            >
              Market
            </Button>
            <Button
              variant="secondary"
              size="xxsmall"
              data-testid={`close-position-limit-${props.row.index}`}
              onClick={() => {
                closePosition(OrderType.ORDER_TYPE_LIMIT, position);
              }}
            >
              Limit
            </Button>
          </div>
        );
      },
    },*/
    {
      header: " ",
      accessorFn: (row: any) => {
        return row?.symbol;
      },
      cell: (props: any) => {
        return (
          <LinkButton
            type="grey"
            size="small"
            onClick={() => queryDetails(props.getValue())}
          >
            {t("details")}
          </LinkButton>
        );
      },
    },
  ];
};

const UnrealizedPnL = ({
  size,
  entryPrice,
  ticker,
}: {
  size: number;
  entryPrice: number;
  ticker: string;
}) => {
  const streamingData = useLocalStreamingData();
  const currentPrice = streamingData[ticker]?.p;

  if (!currentPrice) {
    return <>-</>;
  }

  // P&Lvalue​=(currentPrice - entryPrice)×quantity
  let pnlValue = (currentPrice - entryPrice) * size;

  // P&Lpercentage​=(entryPrice - currentPrice / entryPrice​)×100
  let pnlPercent = ((currentPrice - entryPrice) / entryPrice) * 100;

  let sign = pnlValue < 0 ? "-" : "+";
  const isPositive = pnlValue > 0;
  return (
    <Text variant="textXSmall" color={isPositive ? "bull" : "bear"}>
      <>
        {pnlValue ? (
          <Column>
            <div>
              {sign}${Math.abs(pnlValue).toFixed(5).replace(/0+$/, "")}
            </div>
            <div>
              ({sign}
              {Math.abs(pnlPercent).toFixed(2)}%)
            </div>
          </Column>
        ) : (
          <Text color="tertiary">-</Text>
        )}
      </>
    </Text>
  );
};
