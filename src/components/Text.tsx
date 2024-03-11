import React from "react"
import styled from "styled-components"

import fonts from "../theme/fonts"
type Align = "left" | "center" | "right"
type Tag = "span" | "p"

interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "color"> {
  variant?: keyof typeof fonts.typography
  align?: Align
  color?: string
  as?: Tag
}

const StyledText = styled.p<TextProps>`
  ${({ variant, theme }) => {
    return theme.fonts.typography[variant || "default"]
  }};
  text-align: ${({ align }) => align};
  color: ${({ color, theme }) =>
    color || theme.color.selectedTheme.text.default};
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
