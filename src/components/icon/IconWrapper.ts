import styled from "styled-components"

export const sizeMap = {
  extraTiny: "6px",
  tiny: "10px",
  extraSmall: "12px",
  small: "16px",
  normal: "20px",
  medium: "24px",
  large: "36px",
}

export type TSize =
  | "extraTiny"
  | "tiny"
  | "extraSmall"
  | "small"
  | "normal"
  | "medium"
  | "large"

export interface IIconWrapperProps {
  size: TSize
  fill?: string
  stroke?: string
  strokeWidth?: number
  hoverColor?: string
  color?: string
  onClick?: () => void
  rotate?: "45deg" | "90deg" | "180deg" | "360deg"
}

const IconWrapper = styled.div<IIconWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ size }) => sizeMap[size]};
  width: ${({ size }) => sizeMap[size]};
  cursor: ${({ onClick }) => onClick && "pointer"};
  transform: rotate(${({ rotate }) => rotate || 0});
  transition: 0.4s ease-in-out;

  & > svg {
    width: 100%;
    height: 100%;
    fill: ${({ fill, color }) => !color && fill};
    stroke: ${({ stroke }) => stroke};
    strokewidth: ${({ strokeWidth }) => strokeWidth};

    & path {
      fill: ${({ color }) => color};
    }
    &:hover {
      fill: ${({ fill, hoverColor }) => (fill ? hoverColor : "")};
      fill: ${({ stroke, hoverColor }) => (stroke ? hoverColor : "")};
    }
  }
`

export default IconWrapper
