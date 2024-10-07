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

export const usePositionColumns = function (
  closePosition: (orderType: OrderType, position: PerpetualPosition) => void,
  showTpSl: (position: PerpetualPosition) => void
) {
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
        return <Text color="tertiary">{market?.ticker}</Text>;
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
        <Text color="tertiary">{Number(props.getValue() || 0) / 1e6}</Text>
      ),
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
              display: "flex",
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
