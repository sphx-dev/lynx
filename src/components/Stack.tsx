import React, { FC, ReactNode, CSSProperties } from "react";
import styled from "styled-components";
import { AlignItems, DEFAULT_SPACING, JustifyContent } from "./types";

const StackFlex = styled.div<StackProps>`
  display: flex;
  flex-direction: column;
  flex-wrap: ${(props: StackProps) => (props.wrap ? "wrap" : "nowrap")};

  align-items: ${(props: StackProps) => {
    return AlignItems[props.align || "stretch"];
  }};
  justify-content: ${(props: StackProps) => {
    return JustifyContent[props.justify || "left"];
  }};
  row-gap: ${(props: StackProps) => {
    return `${props.spacing}px`;
  }};
  height: ${(props: StackProps) => {
    return props.fullHeight ? "100%" : "auto";
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
      align={align}
      spacing={spacing}
      justify={justify}
      fullHeight={fullHeight}
      wrap={wrap}
      onClick={onClick}
      className={className}
      style={style}
    >
      {children}
    </StackFlex>
  );
};

export default Stack;
