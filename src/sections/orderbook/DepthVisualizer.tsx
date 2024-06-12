import React, { FunctionComponent } from "react";
import useTheme from "../../hooks/useTheme";
import { OrderType } from "../../types/orderBook";

interface DepthVisualizerProps {
  depth: number;
  orderType: OrderType;
  windowWidth: number;
}

const DepthVisualizer: FunctionComponent<DepthVisualizerProps> = ({
  windowWidth,
  depth,
  orderType,
}) => {
  const { themeColors } = useTheme();
  return (
    <div
      data-testid="depth-visualizer"
      style={{
        backgroundColor: `${
          orderType === OrderType.BIDS
            ? themeColors.positive
            : themeColors.negative
        }`,
        height: "1.250em",
        width: `${depth}%`,
        position: "relative",
        top: 21,
        left: `${100 - depth}%`,
        marginTop: -24,
        zIndex: 0,
      }}
    />
  );
};

export default DepthVisualizer;
