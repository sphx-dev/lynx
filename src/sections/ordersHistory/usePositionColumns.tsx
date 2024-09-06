import { Button, Text } from "../../components";
import UseTheme from "../../hooks/useTheme";
import { OrderSide } from "../../types/order";
import { dateToDisplay } from "../../utils/date";
import { formatNumber } from "../../utils/format";
import { getColorByPl } from "./helpers";

type ClosePositionCallback = (params: {
  size: string;
  side: OrderSide;
  leverage: number;
}) => void;

export const usePositionColumns = function (
  closePosition: ClosePositionCallback
) {
  const { themeColors } = UseTheme();

  return [
    {
      accessorKey: "entryTime",
      header: "Date",
      cell: (props: any) => (
        <Text color="tertiary">{dateToDisplay(props.getValue())}</Text>
      ),
    },
    {
      accessorKey: "ticker",
      header: "Symbol",
      cell: (props: any) => (
        <Text color="tertiary">{props.getValue().replace(".P", "")}</Text>
      ),
    },
    {
      accessorKey: "entryPrice",
      header: "Entry Price",
      cell: (props: any) => (
        <Text color="tertiary">
          {formatNumber({ value: +props.getValue(), fixed: 2 })}
        </Text>
      ),
    },
    {
      accessorKey: "size",
      header: "Size",
      cell: (props: any) => <Text color="tertiary">{props.getValue()}</Text>,
    },
    {
      accessorKey: "unrealizedPl",
      header: "PNL",
      cell: (props: any) => (
        <Text color={getColorByPl(props.getValue())}>
          {formatNumber({ value: +props.getValue(), fixed: 2 })}
        </Text>
      ),
      width: "100px",
    },
    {
      header: "Close",
      cell: (props: any) => {
        console.log(props);
        const { size, side, leverage } = props.row.original;
        return (
          <Button
            variant="link"
            onClick={() => {
              console.log("TODO: CLOSE POSITION", { size, side, leverage });
              closePosition({ size, side, leverage });
            }}
            color={themeColors.text.secondaryLink}
          >
            Market
          </Button>
        );
      },
    },
  ];
};
