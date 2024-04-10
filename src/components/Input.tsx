import React, { useState, FocusEvent, ReactElement, ReactNode } from "react"
import styled from "styled-components"
import { getThemeColors } from "../theme"
import Stack from "./Stack"
import Text from "./Text"
import useTheme from "../hooks/useTheme"

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  error?: string
  label?: string
  rightSide?: string
  fluid?: boolean
}

const StyledInput = styled.input`
  ${({ theme }) => theme.fonts.typography.textNumMd}
  border: none;
  background: none;
  outline: none;
  flex: 1;
  max-width: 100%;
  color: ${({ theme }) => getThemeColors(theme).text.primary};
  &:focus,
  &:focus-visible {
    outline: none;
    color: ${({ theme }) => getThemeColors(theme).text.primary};
  }
  &::placeholder,
  &::-webkit-input-placeholder,
  &:-ms-input-placeholder {
    color: ${({ theme }) => getThemeColors(theme).text.tertiary};
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`

const StyledLabel = styled.label<{ isFocused: boolean }>`
  ${({ theme }) => theme.fonts.typography.textSm}
  color: ${({ theme }) => getThemeColors(theme).text.primary};
  text-align: left;
`

const InputWrapper = styled.div`
  border: ${({ theme }) => `1px solid ${getThemeColors(theme).border.default}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 100%;
  padding: 7px 12px;
  background-color: ${({ theme }) => getThemeColors(theme).background.input};
  &:focus-within {
    border-color: ${({ theme }) => getThemeColors(theme).border.hovered};
  }
  display: flex;
  align-items: center;
`

const Input = ({
  error,
  label,
  rightSide,
  fluid,
  style,
  ...restProps
}: InputProps) => {
  const { themeColors } = useTheme()
  const [isFocused, setIsFocused] = useState(false)
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    if (restProps?.onFocus) {
      restProps.onFocus(e)
    }
  }
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    if (restProps?.onBlur) {
      restProps.onBlur(e)
    }
  }
  return (
    <Stack
      spacing={4}
      style={{ width: fluid ? "100%" : "auto", position: "relative", ...style }}
    >
      {label && <StyledLabel isFocused={isFocused}>{label}</StyledLabel>}
      <InputWrapper style={{ position: "relative" }}>
        <StyledInput
          data-error={error ? "true" : "false"}
          {...restProps}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {rightSide && <Text>{rightSide}</Text>}
      </InputWrapper>
      {error && (
        <Text variant="textSm" color={themeColors.text.error}>
          {error}
        </Text>
      )}
    </Stack>
  )
}

export default Input
