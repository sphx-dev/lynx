import { Side } from "../../types/order";
import Colors from "../../theme/colors";

export const getSideColor = (side: Side) =>
  side === Side.Buy ? Colors.common.positive1 : Colors.common.negative3;

export const getColorByPl = (pl: string) =>
  +pl > 0 ? getSideColor(Side.Buy) : getSideColor(Side.Sell);
