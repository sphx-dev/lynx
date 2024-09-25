import { useMarkets } from "@/hooks/useMarkets";
import { Button, Text } from "../../components";
import UseTheme from "../../hooks/useTheme";
import { dateToDisplay } from "../../utils/date";
import { formatNumber } from "../../utils/format";
import { getColorByPl } from "./helpers";
import { OrderSide, OrderType } from "proto-codecs/codegen/sphx/order/order";

type ClosePositionCallback = (params: {
  size: string;
  side: OrderSide;
  type: OrderType;
  leverage: number;
}) => void;

export const usePositionColumns = function (
  closePosition: ClosePositionCallback
) {
  const { themeColors } = UseTheme();

  const { markets } = useMarkets();

  return [
    {
      accessorKey: "entryTime",
      header: "Date",
      cell: (props: any) => {
        return (
          <Text color="tertiary">
            {dateToDisplay(Number(props.getValue()) * 1000)}
          </Text>
        );
      },
    },
    {
      accessorKey: "marketId",
      header: "Symbol",
      cell: (props: any) => {
        const market = markets.find(m => m.id === props.getValue());
        return (
          <Text color="tertiary">{market?.ticker}</Text>
          // <Text color="tertiary">{props.getValue() /*.replace(".P", "")*/}</Text>
        );
      },
    },
    {
      accessorKey: "entryPrice",
      header: "Entry Price",
      cell: (props: any) => (
        <Text color="tertiary">
          {formatNumber({ value: Number(props.getValue()) / 1e6, fixed: 2 })}
        </Text>
      ),
    },
    {
      accessorKey: "size",
      header: "Qty",
      cell: (props: any) => (
        <Text color="tertiary">{Number(props.getValue() || 0) / 1e6}</Text>
      ),
    },

    {
      // accessorKey: "size",
      accessorFn: (row: any) => {
        return (Number(row.size) / 1e6) * (Number(row.entryPrice) / 1e6);
      },
      header: "Value",
      cell: (props: any) => (
        <Text color="tertiary">
          {formatNumber({ value: props.getValue(), fixed: 8 })}
        </Text>
      ),
    },
    {
      accessorKey: "unrealizedPl",
      header: "PNL",
      cell: (props: any) => (
        <Text color={getColorByPl(props.getValue())}>
          {isNaN(props.getValue())
            ? "-"
            : formatNumber({ value: +props.getValue(), fixed: 2 })}
        </Text>
      ),
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
                  console.log("TODO: SHOW TP/SL", slOrderId, tpOrderId);
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
        // console.log(props);
        const { size, side, leverage } = props.row.original;
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              width: "75px",
            }}
          >
            <Button
              variant="secondary"
              size="xs"
              onClick={() => {
                // console.log("TODO: CLOSE POSITION", { size, side, leverage });
                closePosition({
                  size,
                  side,
                  type: OrderType.ORDER_TYPE_MARKET,
                  leverage,
                });
              }}
              // color={themeColors.text.secondaryLink}
            >
              Market
            </Button>
            <Button
              variant="secondary"
              size="xs"
              onClick={() => {
                // console.log("TODO: CLOSE POSITION", { size, side, leverage });
                closePosition({
                  size,
                  side,
                  type: OrderType.ORDER_TYPE_LIMIT,
                  leverage,
                });
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
