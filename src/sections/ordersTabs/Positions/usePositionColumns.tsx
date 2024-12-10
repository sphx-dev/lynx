import { useMarkets } from "@/hooks/useMarkets";
import { Button, Text } from "@/components";
import UseTheme from "@/hooks/useTheme";
import { formatNumber } from "@/utils/format";
import { getColorByPl } from "../helpers";
import { OrderType } from "proto-codecs/codegen/sphx/order/order";
import {
  PerpetualPosition,
  PositionSide,
} from "proto-codecs/codegen/sphx/order/perpetual_position";
import { PRECISION } from "@/constants";
import { useTranslation } from "react-i18next";
import { Tooltip } from "react-tooltip";
import React, { PropsWithChildren } from "react";
import { useLocalStreamingData } from "@/sections/chart/localStreaming";

export const usePositionColumns = function (
  closePosition: (orderType: OrderType, position: PerpetualPosition) => void,
  showTpSl: (position: PerpetualPosition) => void
) {
  const { t } = useTranslation();
  const { themeColors } = UseTheme();

  const { markets } = useMarkets();

  return [
    {
      accessorKey: "marketId",
      header: "Symbol",
      meta: {
        background: (props: any) => {
          if (props.row.original.side === PositionSide.POSITION_SIDE_LONG) {
            return `linear-gradient(90deg,${themeColors.positive} 0,transparent 100%) 0px`;
          }
          if (props.row.original.side === PositionSide.POSITION_SIDE_SHORT) {
            return `linear-gradient(90deg,${themeColors.negative} 0,transparent 100%) 0px`;
          }
          return "";
        },
      },
      cell: (props: any) => {
        const market = markets.find(m => m.id === props.getValue());
        return <Text color="tertiary">{t(market?.ticker || "")}</Text>;
      },
    },
    // {
    //   accessorKey: "entryTime",
    //   header: "Date",
    //   cell: (props: any) => {
    //     return (
    //       <Text color="tertiary">
    //         {dateToDisplay(Number(props.getValue()) * 1000)}
    //       </Text>
    //     );
    //   },
    // },
    {
      accessorKey: "size",
      header: "Qty",
      cell: (props: any) => (
        <Text color="tertiary">
          {Number(props.getValue() || 0) / PRECISION}
        </Text>
      ),
    },
    {
      accessorKey: "entryPrice",
      header: "Entry Price",
      cell: (props: any) => (
        <Text color="tertiary">
          {formatNumber({
            value: Number(props.getValue()) / PRECISION,
            fixed: 2,
          })}
        </Text>
      ),
    },

    {
      // accessorKey: "size",
      accessorFn: (row: any) => {
        return (
          (Number(row.size) / PRECISION) * (Number(row.entryPrice) / PRECISION)
        );
      },
      header: "Value",
      cell: (props: any) => (
        <Text color="tertiary">
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
        const market = markets.find(m => m.id === row.marketId);
        let size = Number(row.size) / PRECISION;
        let entryPrice = Number(row.entryPrice) / PRECISION;

        return {
          size,
          entryPrice,
          ticker: market?.ticker,
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
        const slOrderId = position.slOrderId;
        const tpOrderId = position.tpOrderId;
        const hasDetails =
          tpOrderId.marginAccountAddress &&
          slOrderId.marginAccountAddress &&
          tpOrderId.number &&
          slOrderId.number;
        return (
          <>
            {hasDetails && (
              <Button
                variant="secondary"
                size="xs"
                onClick={() => {
                  console.log("SHOW TP/SL", slOrderId, tpOrderId);
                  showTpSl(position);
                }}
                // color={themeColors.text.secondaryLink}
              >
                Details
              </Button>
            )}
          </>
        );
      },
      // width: "100px",
    },
    {
      accessorKey: "orderType",
      header: "Type",
      cell: (props: any) => (
        <Text color={themeColors.text.secondaryLink}>
          {props.getValue() === OrderType.ORDER_TYPE_MARKET
            ? "Market"
            : "Limit"}
        </Text>
      ),
      width: "100px",
    },
    {
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
              size="xs"
              data-testid={`close-position-market-${props.row.index}`}
              onClick={() => {
                closePosition(OrderType.ORDER_TYPE_MARKET, position);
              }}
              // color={themeColors.text.secondaryLink}
            >
              Market
            </Button>
            <Button
              variant="secondary"
              size="xs"
              data-testid={`close-position-limit-${props.row.index}`}
              onClick={() => {
                closePosition(OrderType.ORDER_TYPE_LIMIT, position);
              }}
              // color={themeColors.text.secondaryLink}
            >
              Limit
            </Button>
          </div>
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
  return (
    <Text color={getColorByPl(pnlValue.toFixed(10))}>
      <>
        {sign}${pnlValue.toFixed(5).replace(/0+$/, "")} ({sign}
        {pnlPercent.toFixed(2)}%)
      </>
    </Text>
  );
};
