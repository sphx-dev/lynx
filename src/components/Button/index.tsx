import React, { PropsWithChildren } from "react"
import styled from "styled-components"
import { getThemeColors } from "../../theme"

type Size = "xs" | "sm" | "lg"

const SIZE_MAP = {
  xs: "2px 12px",
  sm: "10px",
  lg: "14px 22px",
}

interface Props extends Omit<React.HTMLProps<HTMLButtonElement>, "size"> {
  size?: Size
  pill?: boolean
  fluid?: boolean
}

const StyledButton = styled.button<Props>`
  ${({ theme }) => theme.fonts.typography.default};
  padding: ${({ size }) => (size ? SIZE_MAP[size] : SIZE_MAP.sm)};
  border-radius: ${({ theme, pill }) =>
    pill ? theme.borderRadius.pill : theme.borderRadius.md};
  color: ${({ theme }) => getThemeColors(theme).text.primary};
  background-color: ${({ theme }) => theme.colors.common.palette.alpha.dark5};
  border: ${({ theme }) => `1px solid ${getThemeColors(theme).border.default}`};
  width: ${({ fluid }) => (fluid ? "100%" : "auto")};
`

const Button = ({ children, ...props }: PropsWithChildren<Props>) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

export default Button
