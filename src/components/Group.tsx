import React, { FC, ReactNode, CSSProperties, MouseEvent } from "react";
import styled from "styled-components";
import { AlignItems, DEFAULT_SPACING, JustifyContent } from "./types";

const GroupFlex = styled.div<GroupProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: ${(props) => (props.wrap ? "wrap" : "nowrap")};

  align-items: ${(props) => {
    return AlignItems[props.align || "start"];
  }};
  justify-content: ${(props) => {
    return JustifyContent[props.position || "left"];
  }};
  column-gap: ${(props) => {
    return `${props.spacing}px`;
  }};
  row-gap: ${(props) => {
    return `${props.spacing}px`;
  }};
`;

interface GroupProps {
  children: ReactNode;
  align?: keyof typeof AlignItems;
  position?: keyof typeof JustifyContent;
  spacing?: number;
  fluid?: boolean;
  style?: CSSProperties | undefined;
  onClick?(event: MouseEvent<HTMLDivElement>): void;
  wrap?: boolean;
  className?: any;
}

const Group: FC<GroupProps> = ({
  children,
  align = "start",
  position = "left",
  spacing = DEFAULT_SPACING,
  style,
  onClick,
  wrap = false,
  className,
}) => {
  return (
    <GroupFlex
      className={className}
      onClick={onClick}
      style={style}
      align={align}
      position={position}
      spacing={spacing}
      wrap={wrap}
    >
      {children}
    </GroupFlex>
  );
};

export default Group;
