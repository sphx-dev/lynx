import React, { FC } from "react"
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

interface InputProps {
  name?: string
  register?: any
  disabled?: boolean
  error?: string
  icon?: string
  value?: string
  onChange?(value: string): void
  placeholder?: string
  isLarge?: boolean
  onBlur?: () => void
}

const Input: FC<InputProps> = ({
  onChange,
  value,
  placeholder = "",
  disabled = false,
  error,
  name,
  register = () => ({}),
  onBlur,
}) => {
  const { themeColors } = useTheme()
  return (
    <Stack spacing={4} style={{ width: "100%", position: "relative" }}>
      <div style={{ position: "relative" }}>
        <StyledInput
          name={name}
          type="text"
          id={name}
          value={value || value === "" ? value : undefined}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          data-error={error ? "true" : "false"}
          {...register(name)}
          onBlur={onBlur}
        />
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
