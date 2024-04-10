import React, { PropsWithChildren } from "react"
import styled, { css } from "styled-components"
import { getThemeColors } from "../../theme"

type Size = "xs" | "sm" | "lg"

const SIZE_MAP = {
  xs: "0 8px",
  sm: "10px",
  lg: "14px 22px",
}

type Variant = "default" | "link"

const linkStyle = css`
  background: none;
  border: none;
  text-decoration: underline;
  padding: 0 0;
`
const defaultStyle = css<Props>`
  background-color: ${({ theme }) => getThemeColors(theme).background.button};
  border: ${({ theme }) => `1px solid ${getThemeColors(theme).border.default}`};
  padding: ${({ size }) => (size ? SIZE_MAP[size] : SIZE_MAP.sm)};
`

const STYLE_MAP = {
  link: linkStyle,
  default: defaultStyle,
}

interface Props extends Omit<React.HTMLProps<HTMLButtonElement>, "size"> {
  size?: Size
  pill?: boolean
  fluid?: boolean
  variant?: Variant
}

const StyledButton = styled.button<Props>`
  ${({ variant }) => (variant ? STYLE_MAP[variant] : STYLE_MAP.default)}
  ${({ theme, size }) =>
    size === "xs"
      ? theme.fonts.typography.text2Xs
      : theme.fonts.typography.actionSmBold};
  border-radius: ${({ theme, pill }) =>
    pill ? theme.borderRadius.pill : theme.borderRadius.md};
  color: ${({ theme }) => getThemeColors(theme).text.primary};
  width: ${({ fluid }) => (fluid ? "100%" : "auto")};
`

const Button = ({ children, ...props }: PropsWithChildren<Props>) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

export default Button
