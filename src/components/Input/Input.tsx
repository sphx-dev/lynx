import React, { FocusEvent, forwardRef, ChangeEvent } from "react";
import styled, { css } from "styled-components";
import { ThemeColors } from "../../theme";
import Stack from "../Stack";
import Text from "../Text";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  error?: string;
  label?: string;
  leftSide?: string;
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
  height: var(--input-height);
  font-family: var(--text-small-font-family);
  font-size: var(--text-small-font-size);
  font-weight: var(--text-small-font-weight);
  line-height: var(--text-small-line-height);
  text-align: right;
  border: none;
  background: none;
  outline: none;
  flex: 1;
  max-width: 100%;
  color: var(--text-strong-950);
  &:focus,
  &:focus-visible {
    outline: none;
    color: var(--text-sub-600);
  }
  &::placeholder,
  &::-webkit-input-placeholder,
  &:-ms-input-placeholder {
    color: var(--text-strong-950);
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:active {
    color: var(--text-strong-950);
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const VerticalDivider = styled.div`
  width: 1px;
  height: var(--input-height);
  background-color: var(--stroke-soft-200);
  margin: -10px 0;
`;

const SideWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--input-height);
  min-width: 36px;
`;

const errorStyle = css`
  border: 1px solid var(--text-error);
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  --input-height: 36px;
  height: var(--input-height);
  border: 1px solid var(--stroke-soft-200);
  border-radius: 6px;
  width: 100%;
  padding-inline: 12px;
  background-color: ${({ theme, variant, disabled }) => {
    if (variant === "error") {
      return disabled ? "var(--bg-strong-900)" : "var(--bg-strong-950)";
    }

    return disabled ? "var(--bg-strong-900)" : "var(--bg-strong-950)";
  }};

  &:focus,
  &:focus-within {
    background-color: var(--bg-strong-950);
    border-color: ${({ theme, variant }) =>
      variant === "error" ? "var(--error-base)" : "var(--stroke-soft-200)"};
  }
  &:hover {
    background: ${({ theme, variant }) =>
      variant === "error" ? "var(--bg-surface-800)" : "var(--bg-surface-800)"};
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
      leftSide,
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
        {label && (
          <Text variant="textSmall" color="strong950" align="left">
            {label}
          </Text>
        )}
        <InputWrapper
          style={{ position: "relative" }}
          variant={variant}
          disabled={restProps.disabled}
          $error={!!error}
        >
          {leftSide && (
            <>
              <SideWrapper>
                <Text color="disabled300">{leftSide}</Text>
              </SideWrapper>
              <VerticalDivider />
            </>
          )}
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
          {rightSide && (
            <>
              <VerticalDivider />
              <SideWrapper>
                <Text color="disabled300">{rightSide}</Text>
              </SideWrapper>
            </>
          )}
        </InputWrapper>
        {error && (
          <Text variant="textSmall" color="error">
            {error}
          </Text>
        )}
      </Stack>
    );
  }
);
