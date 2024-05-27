import React, { FC, ReactNode, CSSProperties } from "react";
import styled from "styled-components";
import { AlignItems, DEFAULT_SPACING, JustifyContent } from "./types";

const StackFlex = styled.div<StackFlexProps>`
  display: flex;
  flex-direction: column;
  flex-wrap: ${props => (props.$wrap ? "wrap" : "nowrap")};

  align-items: ${props => {
    return AlignItems[props.$align || "stretch"];
  }};
  justify-content: ${props => {
    return JustifyContent[props.$justify || "left"];
  }};
  row-gap: ${props => {
    return `${props.$spacing}px`;
  }};
  height: ${props => {
    return props.$fullHeight ? "100%" : "auto";
  }};
`;

interface StackProps {
  children: ReactNode;
  align?: keyof typeof AlignItems;
  justify?: keyof typeof JustifyContent;
  spacing?: number;
  fullHeight?: boolean;
  wrap?: boolean;
  style?: CSSProperties | undefined;
  onClick?(): void;
  className?: string;
}

interface StackFlexProps extends StackProps {
  $align?: keyof typeof AlignItems;
  $justify?: keyof typeof JustifyContent;
  $spacing?: number;
  $fullHeight?: boolean;
  $wrap?: boolean;
}
const Stack: FC<StackProps> = ({
  children,
  align = "stretch",
  justify = "left",
  spacing = DEFAULT_SPACING,
  fullHeight = false,
  wrap = false,
  style,
  onClick,
  className,
}) => {
  return (
    <StackFlex
      $align={align}
      $spacing={spacing}
      $justify={justify}
      $fullHeight={fullHeight}
      $wrap={wrap}
      onClick={onClick}
      className={className}
      style={style}
    >
      {children}
    </StackFlex>
  );
};

export default Stack;
