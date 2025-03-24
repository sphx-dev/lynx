import React, { FocusEvent, forwardRef, ChangeEvent } from "react";
import styled, { css } from "styled-components";
import { ThemeColors } from "../../theme";
import Stack from "../Stack";
import Text from "../Text";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  error?: string;
  label?: string;
  rightSide?: string;
  fluid?: boolean;
  variant?: keyof ThemeColors["input"];
  inputStyle?: React.CSSProperties;
}

type Ref = HTMLInputElement;

interface InputWrapperProps {
  variant: keyof ThemeColors["input"];
  disabled?: boolean;
  $error?: boolean;
}

const numberRegex = /^\d*\.?\d*$/;

const StyledInput = styled.input`
  font-family: var(--text-num-md-font-family);
  font-size: var(--text-num-md-font-size);
  font-weight: var(--text-num-md-font-weight);
  line-height: var(--text-num-md-line-height);
  text-align: right;
  border: none;
  background: none;
  outline: none;
  flex: 1;
  max-width: 100%;
  color: var(--text-primary);
  &:focus,
  &:focus-visible {
    outline: none;
    color: var(--text-primary);
  }
  &::placeholder,
  &::-webkit-input-placeholder,
  &:-ms-input-placeholder {
    color: var(--text-tertiary);
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

export const InputLabel = styled.label`
  font-family: var(--text-sm-font-family);
  font-size: var(--text-sm-font-size);
  font-weight: var(--text-sm-font-weight);
  line-height: var(--text-sm-line-height);
  color: var(--text-primary);
  text-align: left;
`;

const errorStyle = css`
  border: 1px solid var(--text-error);
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  border: 1px solid transparent;
  border-radius: var(--border-radius-md);
  width: 100%;
  padding: 7px 12px;
  background-color: ${({ theme, variant, disabled }) => {
    if (variant === "error") {
      return disabled
        ? "var(--input-error-background-disabled)"
        : "var(--input-error-background-error)";
    }

    return disabled
      ? /*getThemeColors(theme).input[variant].background.disabled*/ "var(--input-background-disabled)"
      : /*getThemeColors(theme).input[variant].background.default}*/ "var(--input-background-default)";
  }};
  &:focus-within {
    border-color: ${({ theme, variant }) =>
      variant === "error"
        ? "var(--input-error-border-focused)"
        : "var(--input-border-focused)"};
  }
  &:hover {
    background: ${({ theme, variant }) =>
      variant === "error"
        ? "var(--input-error-background-hovered)"
        : "var(--input-background-hovered)"};
  }
  display: flex;
  gap: 0.5rem;
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
      inputStyle,
      variant = "primary",
      onChange,
      type,
      onFocus,
      onBlur,
      ...restProps
    },
    ref
  ) => {
    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      if (onFocus) {
        onFocus(e);
      }
    };
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
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
        {label && <InputLabel>{label}</InputLabel>}
        <InputWrapper
          style={{ position: "relative" }}
          variant={variant}
          disabled={restProps.disabled}
          $error={!!error}
        >
          <StyledInput
            data-error={error ? "true" : "false"}
            ref={ref}
            type={type}
            style={inputStyle}
            {...restProps}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {rightSide && <Text>{rightSide}</Text>}
        </InputWrapper>
        {error && (
          <Text variant="textSm" color="error">
            {error}
          </Text>
        )}
      </Stack>
    );
  }
);
