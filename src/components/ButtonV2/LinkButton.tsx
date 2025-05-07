import React, { ForwardedRef } from "react";
import styled from "styled-components";
import { css } from "styled-components";

type Type =
  | "grey"
  | "black"
  | "primary"
  | "error"
  | "modifiable"
  | "background";
type Size = "medium" | "small";

type Props = Omit<React.HTMLProps<HTMLButtonElement>, "size"> & {
  type?: Type;
  size?: Size;
  underline?: boolean;
};

export const LinkButton = React.forwardRef(
  (
    {
      children,
      type = "primary",
      size = "medium",
      underline = false,
      ...rest
    }: Props,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <BtnWrapper
        ref={ref}
        className={`${type} ${size} ${underline ? "underline" : ""}`}
        {...rest}
      >
        {children}
      </BtnWrapper>
    );
  }
);

// Types
const greyStyle = css`
  --text-color: var(--text-sub-600);
  --bg-color: transparent;

  --text-color-hover: var(--text-sub-600);
  --bg-color-hover: transparent;

  --text-color-focus: var(--strong-950);
  --bg-color-focus: transparent;

  --text-color-disabled: var(--disabled-300);
  --bg-color-disabled: transparent;
`;

const blackStyle = css`
  --text-color: var(--strong-950);
  --bg-color: transparent;

  --text-color-hover: var(--strong-950);
  --bg-color-hover: transparent;

  --text-color-focus: var(--strong-950);
  --bg-color-focus: transparent;

  --text-color-disabled: var(--disabled-300);
  --bg-color-disabled: transparent;
`;

const primaryStyle = css`
  --text-color: var(--primary-base);
  --bg-color: transparent;

  --text-color-hover: var(--primary-darker);
  --bg-color-hover: transparent;

  --text-color-focus: var(--primary-base);
  --bg-color-focus: transparent;

  --text-color-disabled: var(--disabled-300);
  --bg-color-disabled: transparent;
`;

const errorStyle = css`
  --text-color: var(--error-base);
  --bg-color: transparent;

  --text-color-hover: var(--error-dark);
  --bg-color-hover: transparent;

  --text-color-focus: var(--error-base);
  --bg-color-focus: transparent;

  --text-color-disabled: var(--disabled-300);
  --bg-color-disabled: transparent;
`;

const modifiableStyle = css`
  --text-color: var(--neutral-0);
  --bg-color: transparent;

  --text-color-hover: var(--neutral-0);
  --bg-color-hover: transparent;

  --text-color-focus: var(--netural-0);
  --bg-color-focus: transparent;

  --text-color-disabled: var(--disabled-300);
  --bg-color-disabled: transparent;
`;

const backgroundStyle = css`
  --text-color: var(--text-strong-950);
  --bg-color: var(--bg-surface-800);

  --text-color-hover: var(--bg-surface-700);
  --bg-color-hover: transparent;

  --text-color-focus: var(--bg-surface-800);
  --bg-color-focus: transparent;

  --text-color-disabled: var(--bg-strong-950);
  --bg-color-disabled: transparent;
`;

const BtnWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  white-space: nowrap;
  padding: 0px 4px;

  &.underline {
    text-decoration: underline;
  }

  /* Size */
  &.medium {
    font-family: var(--text-small-font-family);
    font-size: var(--text-small-font-size);
    font-weight: var(--text-small-font-weight);
    line-height: var(--text-small-line-height);
  }

  &.small {
    font-family: var(--text-x-small-font-family);
    font-size: var(--text-x-small-font-size);
    font-weight: var(--text-x-small-font-weight);
    line-height: var(--text-x-small-line-height);
  }

  cursor: pointer;

  /* Types */
  &.grey {
    ${greyStyle}
  }
  &.black {
    ${blackStyle}
  }
  &.primary {
    ${primaryStyle}
  }
  &.error {
    ${errorStyle}
  }
  &.modifiable {
    ${modifiableStyle}
  }
  &.background {
    ${backgroundStyle}
  }

  color: var(--text-color);
  background-color: var(--bg-color);
  border: none;

  &:hover {
    color: var(--text-color-hover);
    background-color: var(--bg-color-hover);
  }
  &:focus {
    color: var(--text-color-focus);
    background-color: var(--bg-color-focus);
  }
  &:disabled {
    color: var(--text-color-disabled);
    background-color: var(--bg-color-disabled);
    cursor: not-allowed;
    pointer-events: none;
  }
`;
