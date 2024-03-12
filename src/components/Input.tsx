import React from "react"
import styled from "styled-components"
import { getThemeColors } from "../theme"
import Stack from "./Stack"
import Text from "./Text"
import useTheme from "../hooks/useTheme"

const StyledInput = styled.input`
  ${({ theme }) => theme.fonts.typography.body}
  border: ${({ theme }) => `1px solid ${getThemeColors(theme).border.default}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => getThemeColors(theme).text.placeholder};
  padding: 6px 8px;
  &:focus,
  &:focus-visible {
    outline: none;
    color: ${({ theme }) => getThemeColors(theme).text.inputDefault};
    border-color: ${({ theme }) => getThemeColors(theme).border.hovered};
  }
  &::placeholder,
  &::-webkit-input-placeholder,
  &:-ms-input-placeholder {
    color: ${({ theme }) => getThemeColors(theme).text.placeholder};
  }
`

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  error?: string
}

const Input = ({ error, ...restProps }: InputProps) => {
  const { themeColors } = useTheme()
  return (
    <Stack spacing={4} style={{ width: "100%", position: "relative" }}>
      <div style={{ position: "relative" }}>
        <StyledInput data-error={error ? "true" : "false"} {...restProps} />
      </div>
      {error && (
        <Text variant="small" color={themeColors.text.error}>
          {error}
        </Text>
      )}
    </Stack>
  )
}

export default Input
