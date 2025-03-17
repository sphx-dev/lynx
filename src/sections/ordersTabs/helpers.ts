import { Side } from "../../types/order";
import Colors from "../../theme/colors";
import { OrderStatus } from "proto-codecs/codegen/sphx/order/validated_order";
import { OrderType } from "proto-codecs/codegen/sphx/order/order";

export const getSideColor = (side: Side) =>
  side === Side.Buy ? Colors.common.positive1 : Colors.common.negative3;

export const getSideTextColor = (side: string) =>
  side === Side.Buy ? "buy" : "sell";

export const getColorByPl = (pl: string) =>
  +pl > 0 ? getSideColor(Side.Buy) : getSideColor(Side.Sell);

export const getOrderStatusText = (
  status: OrderStatus,
  t: (key: string) => string
) => {
  /**
   *   ORDER_STATUS_UNSPECIFIED = 0,
   *   ORDER_STATUS_OPEN = 1,
   *   ORDER_STATUS_PARTIALLY_FILLED = 2,
   *   ORDER_STATUS_FILLED = 3,
   *   ORDER_STATUS_CANCELED = 4,
   *   ORDER_STATUS_EXPIRED = 5,
   *   UNRECOGNIZED = -1,
   */
  switch (status) {
    case OrderStatus.ORDER_STATUS_UNSPECIFIED:
      return t("ORDER_STATUS_UNSPECIFIED");
    case OrderStatus.ORDER_STATUS_OPEN:
      return t("ORDER_STATUS_OPEN");
    case OrderStatus.ORDER_STATUS_PARTIALLY_FILLED:
      return t("ORDER_STATUS_PARTIALLY_FILLED");
    case OrderStatus.ORDER_STATUS_FILLED:
      return t("ORDER_STATUS_FILLED");
    case OrderStatus.ORDER_STATUS_CANCELED:
      return t("ORDER_STATUS_CANCELED");
    case OrderStatus.ORDER_STATUS_EXPIRED:
      return t("ORDER_STATUS_EXPIRED");
    case OrderStatus.UNRECOGNIZED:
      return t("ORDER_STATUS_UNRECOGNIZED");
    default:
      return t("ORDER_STATUS_UNKNOWN");
  }
};

export const getOrderTypeText = (
  type: OrderType,
  t: (key: string) => string
) => {
  // ORDER_TYPE_LIMIT = 0,
  // ORDER_TYPE_MARKET = 1,
  // ORDER_TYPE_STOP_LOSS_MARKET = 2,
  // ORDER_TYPE_STOP_LOSS_LIMIT = 3,
  // ORDER_TYPE_TAKE_PROFIT_MARKET = 4,
  // ORDER_TYPE_TAKE_PROFIT_LIMIT = 5,
  // UNRECOGNIZED = -1,
  switch (type) {
    case OrderType.ORDER_TYPE_LIMIT:
      return t("ORDER_TYPE_LIMIT");
    case OrderType.ORDER_TYPE_MARKET:
      return t("ORDER_TYPE_MARKET");
    case OrderType.ORDER_TYPE_STOP_LOSS_MARKET:
      return t("ORDER_TYPE_STOP_LOSS_MARKET");
    case OrderType.ORDER_TYPE_STOP_LOSS_LIMIT:
      return t("ORDER_TYPE_STOP_LOSS_LIMIT");
    case OrderType.ORDER_TYPE_TAKE_PROFIT_MARKET:
      return t("ORDER_TYPE_TAKE_PROFIT_MARKET");
    case OrderType.ORDER_TYPE_TAKE_PROFIT_LIMIT:
      return t("ORDER_TYPE_TAKE_PROFIT_LIMIT");
    case OrderType.UNRECOGNIZED:
      return t("ORDER_TYPE_UNRECOGNIZED");
    default:
      return t("ORDER_TYPE_UNKNOWN");
  }
};
