import React, { useState, FocusEvent, forwardRef, ChangeEvent } from "react";
import styled, { css } from "styled-components";
import { getThemeColors, ThemeColors } from "../../theme";
import Stack from "../Stack";
import Text from "../Text";
import useTheme from "../../hooks/useTheme";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  error?: string;
  label?: string;
  rightSide?: string;
  fluid?: boolean;
  variant?: keyof ThemeColors["input"];
}

type Ref = HTMLInputElement;

interface InputWrapperProps {
  variant: keyof ThemeColors["input"];
  disabled?: boolean;
  $error?: boolean;
}

const numberRegex = /^\d*\.?\d*$/;

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
`;

export const InputLabel = styled.label<{ $isFocused: boolean }>`
  ${({ theme }) => theme.fonts.typography.textSm}
  color: ${({ theme }) => getThemeColors(theme).text.primary};
  text-align: left;
`;

const errorStyle = css`
  border: ${({ theme }) => `1px solid ${getThemeColors(theme).text.error}`};
`;

const InputWrapper = styled.div<InputWrapperProps>`
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 100%;
  padding: 7px 12px;
  background-color: ${({ theme, variant, disabled }) =>
    disabled
      ? getThemeColors(theme).input[variant].background.disabled
      : getThemeColors(theme).input[variant].background.default};
  &:focus-within {
    border-color: ${({ theme, variant }) =>
      getThemeColors(theme).input[variant].border.focused};
  }
  &:hover {
    background: ${({ theme, variant }) =>
      getThemeColors(theme).input[variant].background.hovered};
  }
  display: flex;
  align-items: center;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
  ${({ $error }) => $error && errorStyle}
`;

export const Input = forwardRef<Ref, InputProps>(
  (
    {
      error,
      label,
      rightSide,
      fluid,
      style,
      variant = "primary",
      onChange,
      type,
      onFocus,
      onBlur,
      ...restProps
    },
    ref
  ) => {
    const { themeColors } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (onFocus) {
        onFocus(e);
      }
    };
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (onBlur) {
        onBlur(e);
      }
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (type === "number") {
        if (numberRegex.test(event.target.value)) {
          return onChange && onChange(event);
        }
        return;
      }
      onChange && onChange(event);
    };

    return (
      <Stack
        spacing={4}
        style={{
          width: fluid ? "100%" : "auto",
          position: "relative",
          ...style,
        }}
      >
        {label && <InputLabel $isFocused={isFocused}>{label}</InputLabel>}
        <InputWrapper
          style={{ position: "relative" }}
          variant={variant}
          disabled={restProps.disabled}
          $error={!!error}
        >
          <StyledInput
            data-error={error ? "true" : "false"}
            ref={ref}
            {...restProps}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {rightSide && <Text>{rightSide}</Text>}
        </InputWrapper>
        {error && (
          <Text variant="textSm" color={themeColors.text.error}>
            {error}
          </Text>
        )}
      </Stack>
    );
  }
);
