import { Side } from "../../types/order";
import Colors from "../../theme/colors";
import { OrderStatus } from "proto-codecs/codegen/sphx/order/validated_order";

export const getSideColor = (side: Side) =>
  side === Side.Buy ? Colors.common.positive1 : Colors.common.negative3;

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
