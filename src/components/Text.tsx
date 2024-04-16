import React from "react"
import styled from "styled-components"
import { ThemeColors } from "../theme";

import fonts from "../theme/fonts"
import { getThemeColors } from "../theme"
type Align = "left" | "center" | "right"
type Tag = "span" | "p"
type Color = keyof ThemeColors["text"]

interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "color"> {
  variant?: keyof typeof fonts.typography
  align?: Align
  color?: Color | string
  as?: Tag
}

const StyledText = styled.p<TextProps>`
  ${({ variant, theme }) => {
    return theme.fonts.typography[variant || "textSm"]
  }};
  text-align: ${({ align }) => align};
  color: ${({ color, theme }) =>
    color
      ? getThemeColors(theme).text[color as Color] || color
      : getThemeColors(theme).text.primary};
  margin-bottom: 0 !important;
`

const Text = ({
  variant,
  color,
  align = "left",
  children,
  as = "p",
}: TextProps) => {
  return (
    <StyledText as={as} align={align} variant={variant} color={color}>
      {children}
    </StyledText>
  )
}

export default Text
