import { OrderType } from "../../types/orderBook";
import styled from "styled-components";
import { getThemeColors } from "@/theme";

const DepthVisualizer = styled.div<{
  $orderType: OrderType;
  $depth: number;
  $filled: number;
}>`
  background-color: ${({ $orderType, theme }) =>
    $orderType === OrderType.BIDS
      ? getThemeColors(theme).positive
      : getThemeColors(theme).negative};

  height: 98%;
  width: ${({ $depth }) => $depth}%;
  top: 0;
  right: 0;
  position: absolute;
  transform: translateY(1%);
  z-index: 0;
  :hover > & {
    // TODO: hover collors for depth
    /* background-color: ${({ $orderType, theme }) =>
      $orderType === OrderType.BIDS
        ? getThemeColors(theme).positive
        : getThemeColors(theme).negative}; */
  }
  &:after {
    content: "";
    display: block;
    height: 98%;
    //TODO: fix this with proper width calculation of partially filled depth
    width: ${({ $filled }) => $filled}%;
    top: 0;
    right: 0;
    position: absolute;
    z-index: 1;
    background-color: ${({ $orderType, theme }) =>
      $orderType === OrderType.BIDS
        ? getThemeColors(theme).positive2
        : getThemeColors(theme).negative2};
  }
  :hover > &:after {
    // TODO: hover collors for partially filled depth
    /* background-color: ${({ $orderType, theme }) =>
      $orderType === OrderType.BIDS
        ? getThemeColors(theme).positive2
        : getThemeColors(theme).negative2}; */
  }
`;

export default DepthVisualizer;
