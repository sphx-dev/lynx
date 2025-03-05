import React from "react";
import styled from "styled-components";
import { ThemeColors } from "../theme";
import cx from "classnames";

import fonts from "../theme/fonts";
type Align = "left" | "center" | "right";
type Tag = "span" | "p";
type Color = keyof ThemeColors["text"];

const variantClassNames = {
  textXl: "text-xl",
  textLg: "text-lg",
  textMd: "text-md",
  textSm: "text-sm",
  textXs: "text-xs",
  text2Xs: "text-2xs",
  textNumSm: "text-num-sm",
  textNumSmBold: "text-num-sm-bold",
  textNumMd: "text-num-md",
  textNumMdBold: "text-num-md-bold",
  textNumLg: "text-num-lg",
  actionMd: "action-md",
  actionMdBold: "action-md-bold",
  actionSm: "action-sm",
  actionSmBold: "action-sm-bold",
  actionXs: "action-xs",
  navigation: "navigation",
  header: "header",
  label: "label",
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

interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "color"> {
  variant?: keyof typeof fonts.typography;
  align?: Align;
  color?: Color | string;
  as?: Tag;
}

const StyledText = styled.p<TextProps>`
  display: inline-block;
  text-align: ${({ align }) => align};
  margin-bottom: 0 !important;
`;

const Text = ({
  variant,
  color,
  align = "left",
  children,
  as = "p",
  ...props
}: TextProps) => {
  return (
    <StyledText
      as={as}
      align={align}
      variant={variant}
      className={cx(
        variantClassNames[variant || "textSm"],
        color && color in colorClassNames ? colorClassNames[color as Color] : ""
      )}
      style={{
        color:
          color && color in colorClassNames ? color : "var(--text-primary)",
      }}
      {...props}
    >
      {children}
    </StyledText>
  );
};

export default Text;
