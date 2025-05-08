import React from "react";
import styled from "styled-components";
import cx from "classnames";

type Align = "left" | "center" | "right";
type Tag = "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const variantClassNamesV2 = {
  textXLarge: "text-x-large",
  textLarge: "text-large",
  textMedium: "text-medium",
  textSmall: "text-small",
  textXSmall: "text-x-small",
};

const colorClassNames = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  error: "text-error",
  secondaryActive: "text-secondary-active",
  secondaryLink: "text-secondary-link",
  primaryLink: "text-primary-link",
  buy: "text-buy",
  sell: "text-sell",
};

const colorClassNamesV2 = {
  strong950: "color-text-strong-950",
  sub600: "color-text-sub-600",
  soft400: "color-text-soft-400",
  disabled300: "color-text-disabled-300",
  white0: "color-text-white0",
  bull: "color-text-bull",
  bear: "color-text-bear",
};

interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "color"> {
  variant?: keyof typeof variantClassNamesV2;
  align?: Align;
  color?: keyof typeof colorClassNamesV2 | string;
  as?: Tag;
}

const StyledText = styled.p<TextProps>`
  /* color: var(--text-primary); */
  color: var(--neutral-0);
  ${({ align }) =>
    align && `text-align: ${align};`}/* margin-bottom: 0 !important; */
`;

const Text = ({
  variant,
  color,
  align,
  children,
  as = "span",
  ...props
}: TextProps) => {
  let style = {};
  if (color && !(color in colorClassNames)) {
    style = {
      color: color,
    };
  }
  return (
    <StyledText
      as={as}
      align={align}
      variant={variant}
      className={cx(
        "text",
        // variant in variantClassNamesV2
        //   ? variantClassNamesV2[variant as keyof typeof variantClassNamesV2]
        //   : variant in variantClassNamesV2
        //   ? variantClassNamesV2[variant as keyof typeof variantClassNamesV2]
        //   : variant in variantClassNames
        //   ? variantClassNames[variant]
        //   : "text-sm",
        // variant in variantClassNames
        //   ? variantClassNames[variant || "textSm"]
        //   : null,
        variantClassNamesV2[variant || "textSmall"],
        // color && color in colorClassNames ? colorClassNames[color as Color] : ""
        color && color in colorClassNamesV2
          ? colorClassNamesV2[color as keyof typeof colorClassNamesV2]
          : ""
      )}
      style={style}
      {...props}
    >
      {children}
    </StyledText>
  );
};

export default Text;
