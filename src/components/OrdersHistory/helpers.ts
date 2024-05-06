import { Side } from "../../types/order";
import Colors from "../../theme/colors";

export const getSideColor = (side: Side) =>
  side === Side.Buy ? Colors.common.positive1 : Colors.common.negative3;
