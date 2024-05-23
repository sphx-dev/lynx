import React, { PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { getThemeColors, ThemeColors } from "../../theme";

type Size = "xs" | "sm" | "lg";

const SIZE_MAP = {
  xs: "0 8px",
  sm: "7px 12px",
  lg: "14px 22px",
};

type Variant = keyof ThemeColors["button"];
interface CssProps extends Props {
  variant: Variant;
  $pill?: boolean;
  $fluid?: boolean;
}

const styleByVariant = css<CssProps>`
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
  background: ${({ theme, disabled, variant }) =>
    disabled
      ? getThemeColors(theme).button[variant].background.disabled
      : getThemeColors(theme).button[variant].background.default};
  padding: ${({ size }) => (size ? SIZE_MAP[size] : SIZE_MAP.sm)};
  &:focus {
    border: ${({ theme, variant }) =>
      `1px solid ${
        getThemeColors(theme).button[variant].border.focused
      } !important`};
  }
  &:hover {
    background: ${({ theme, variant }) =>
      getThemeColors(theme).button[variant].background.hovered};
  }
  &:active {
    background: ${({ theme, variant }) =>
      getThemeColors(theme).button[variant].background.pressed};
  }
  border: 1px solid transparent;
`;

interface Props extends Omit<React.HTMLProps<HTMLButtonElement>, "size"> {
  size?: Size;
  pill?: boolean;
  fluid?: boolean;
  variant?: Variant;
}

const StyledButton = styled.button<CssProps>`
  ${styleByVariant}
  ${({ theme, size }) =>
    size === "xs"
      ? theme.fonts.typography.text2Xs
      : theme.fonts.typography.actionSmBold};
  border-radius: ${({ theme, $pill }) =>
    $pill ? theme.borderRadius.pill : theme.borderRadius.md};
  color: ${({ theme, disabled, color }) =>
    disabled
      ? getThemeColors(theme).text.tertiary
      : color || getThemeColors(theme).text.primary};
  width: ${({ $fluid }) => ($fluid ? "100%" : "auto")};
  outline: none;
  cursor: pointer;
`;
const StyledWrapper = styled.span<Partial<CssProps>>`
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: inline-block;
  padding: 2px;
  border-radius: 1000px;
  width: ${({ $fluid }) => ($fluid ? "100%" : "auto")};
  align-self: center;
`;

const Wrapper = ({
  variant,
  children,
  fluid,
  ...props
}: PropsWithChildren<Props>) => {
  if (variant === "primary")
    return (
      <StyledWrapper $fluid={fluid} {...props}>
        {children}
      </StyledWrapper>
    );
  return <>{children}</>;
};

const Button = ({
  children,
  variant = "secondary",
  pill,
  fluid,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <Wrapper variant={variant} fluid={fluid} {...props}>
      <StyledButton $pill={pill} $fluid={fluid} variant={variant} {...props}>
        {children}
      </StyledButton>
    </Wrapper>
  );
};

export default Button;
