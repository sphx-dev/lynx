import React, { ForwardedRef, PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { getThemeColors, ThemeColors } from "../../theme";

export type Size = "xs" | "sm" | "lg";

const SIZE_MAP = {
  xs: "0 8px",
  sm: "7px 12px",
  lg: "14px 22px",
};

export type Variant = keyof ThemeColors["button"];
type Color = keyof ThemeColors["text"];
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

type Props = Omit<React.HTMLProps<HTMLButtonElement>, "size"> & {
  size?: Size;
  pill?: boolean;
  fluid?: boolean;
  variant?: Variant;
};

const StyledButton = styled.button<CssProps>`
  ${styleByVariant}
  ${({ theme, size }) =>
    size === "xs"
      ? theme.fonts.typography.text2Xs
      : theme.fonts.typography.actionSmBold};
  border-radius: ${({ theme, $pill }) =>
    $pill ? theme.borderRadius.pill : theme.borderRadius.md};
  color: ${({ theme, disabled, color = "primary" }) =>
    disabled
      ? getThemeColors(theme).text.tertiary
      : getThemeColors(theme).text[color as Color] || color};
  width: ${({ $fluid }) => ($fluid ? "100%" : "auto")};
  outline: none;
  cursor: pointer;
  transition: 0.2s all;
  &:active {
    transform: scale(0.95);
  }
`;
const StyledWrapper = styled.span<Partial<CssProps>>`
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: inline-flex;
  padding: 2px;
  border-radius: ${
    ({ theme, $pill }) =>
      $pill
        ? theme.borderRadius.pill
        : "12px" /* TODO: extend "theme.borderRadius.md" to have also "wrapperBorderRadius" */
  };
  width: ${({ $fluid }) => ($fluid ? "100%" : "auto")};
  align-self: center;
`;

const Wrapper = ({
  variant,
  children,
  fluid,
  pill,
  ...props
}: PropsWithChildren<Props>) => {
  if (variant === "primary")
    return (
      <StyledWrapper $pill={pill} $fluid={fluid} {...props}>
        {children}
      </StyledWrapper>
    );
  return <>{children}</>;
};

const Button = React.forwardRef(
  (
    {
      children,
      variant = "secondary",
      pill,
      fluid,
      ...props
    }: PropsWithChildren<Props>,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <Wrapper pill={pill} fluid={fluid} variant={variant} {...props}>
        <StyledButton
          $pill={pill}
          $fluid={fluid}
          variant={variant}
          ref={ref}
          {...props}
        >
          {children}
        </StyledButton>
      </Wrapper>
    );
  }
);

export type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>;
export default Button;
