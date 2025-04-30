import React, { ForwardedRef } from "react";
import styled from "styled-components";
import { css } from "styled-components";

type Type = "primary" | "neutral" | "error";
type Option = "filled" | "stroke" | "lighter" | "ghost";
type Size = "medium" | "small" | "xsmall" | "xxsmall";

type Props = Omit<React.HTMLProps<HTMLButtonElement>, "size"> & {
  type?: Type;
  option?: Option;
  size?: Size;
  htmlType?: "button" | "submit" | "reset";
};

export type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>;
export const Button = React.forwardRef(
  (
    {
      children,
      type = "primary",
      option = "filled",
      size = "medium",
      htmlType,
      ...rest
    }: Props,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <BtnWrapper
        ref={ref}
        className={`${type} ${option} ${size}`}
        type={htmlType}
        {...rest}
      >
        {children}
      </BtnWrapper>
    );
  }
);

// Types
const primaryStyle = css`
  --outline-color: var(--primary-alpha-10);

  --filled-bg-color: var(--primary-base);
  --filled-border-color: var(--primary-base);
  --filled-text-color: black;
  --filled-bg-color-hover: var(--primary-darker);
  --filled-border-color-hover: var(--primary-darker);
  --filled-text-color-hover: black;
  --filled-bg-color-focus: var(--primary-base);
  --filled-border-color-focus: var(--primary-base);
  --filled-text-color-focus: black;

  --stroke-bg-color: var(--bg-strong-950);
  --stroke-border-color: var(--primary-base);
  --stroke-text-color: var(--primary-base);
  --stroke-bg-color-hover: var(--primary-alpha-10);
  --stroke-border-color-hover: var(--primary-alpha-10);
  --stroke-text-color-hover: var(--primary-base);
  --stroke-bg-color-focus: var(--bg-strong-950);
  --stroke-border-color-focus: var(--primary-base);
  --stroke-text-color-focus: var(--primary-base);

  --lighter-bg-color: var(--primary-alpha-10);
  --lighter-border-color: var(--primary-alpha-10);
  --lighter-text-color: var(--primary-base);
  --lighter-bg-color-hover: var(--bg-strong-950);
  --lighter-border-color-hover: var(--primary-alpha-10);
  --lighter-text-color-hover: var(--primary-base);
  --lighter-bg-color-focus: var(--bg-strong-950);
  --lighter-border-color-focus: var(--bg-strong-950);
  --lighter-text-color-focus: var(--primary-base);

  --ghost-bg-color: transparent;
  --ghost-border-color: transparent;
  --ghost-text-color: var(--primary-base);
  --ghost-bg-color-hover: var(--primary-alpha-10);
  --ghost-border-color-hover: var(--primary-alpha-10);
  --ghost-text-color-hover: var(--primary-base);
  --ghost-bg-color-focus: var(--bg-strong-950);
  --ghost-border-color-focus: var(--bg-strong-950);
  --ghost-text-color-focus: var(--primary-base);
`;

const neutralStyle = css`
  --outline-color: var(--neutral-alpha-10);

  --filled-bg-color: var(--bg-white-0);
  --filled-border-color: var(--bg-white-0);
  --filled-text-color: var(--text-white-0);
  --filled-bg-color-hover: var(--bg-sub-300);
  --filled-border-color-hover: var(--bg-sub-300);
  --filled-text-color-hover: var(--text-white-0);
  --filled-bg-color-focus: var(--bg-white-0);
  --filled-border-color-focus: var(--bg-white-0);
  --filled-text-color-focus: var(--text-white-0);

  --stroke-bg-color: var(--bg-strong-950);
  --stroke-border-color: var(--stroke-soft-200);
  --stroke-text-color: var(--text-sub-600);
  --stroke-bg-color-hover: var(--bg-surface-800);
  --stroke-border-color-hover: var(--bg-surface-800);
  --stroke-text-color-hover: var(--text-strong-950);
  --stroke-bg-color-focus: var(--bg-strong-950);
  --stroke-border-color-focus: var(--stroke-strong-950);
  --stroke-text-color-focus: var(--text-strong-950);

  --lighter-bg-color: var(--bg-surface-800);
  --lighter-border-color: var(--bg-surface-800);
  --lighter-text-color: var(--text-sub-600);
  --lighter-bg-color-hover: var(--bg-strong-950);
  --lighter-border-color-hover: var(--stroke-soft-200);
  --lighter-text-color-hover: var(--text-strong-950);
  --lighter-bg-color-focus: var(--bg-strong-950);
  --lighter-border-color-focus: var(--stroke-strong-950);
  --lighter-text-color-focus: var(--text-strong-950);

  --ghost-bg-color: transparent;
  --ghost-border-color: transparent;
  --ghost-text-color: var(--text-sub-600);
  --ghost-bg-color-hover: var(--bg-surface-800);
  --ghost-border-color-hover: var(--bg-surface-800);
  --ghost-text-color-hover: var(--text-strong-950);
  --ghost-bg-color-focus: var(--bg-strong-950);
  --ghost-border-color-focus: var(--stroke-strong-950);
  --ghost-text-color-focus: var(--text-strong-950);
`;

const errorStyle = css`
  --outline-color: var(--error-lighter);

  --filled-bg-color: var(--error-base);
  --filled-border-color: var(--error-base);
  --filled-text-color: white;
  --filled-bg-color-hover: var(--error-dark);
  --filled-border-color-hover: var(--error-dark);
  --filled-text-color-hover: white;
  --filled-bg-color-focus: var(--error-base);
  --filled-border-color-focus: var(--error-base);
  --filled-text-color-focus: white;

  --stroke-bg-color: var(--bg-strong-950);
  --stroke-border-color: var(--error-base);
  --stroke-text-color: var(--error-base);
  --stroke-bg-color-hover: var(--error-lighter);
  --stroke-border-color-hover: var(--error-lighter);
  --stroke-text-color-hover: var(--error-base);
  --stroke-bg-color-focus: var(--bg-strong-950);
  --stroke-border-color-focus: var(--error-base);
  --stroke-text-color-focus: var(--error-base);

  --lighter-bg-color: var(--error-lighter);
  --lighter-border-color: var(--error-lighter);
  --lighter-text-color: var(--error-base);
  --lighter-bg-color-hover: var(--bg-strong-950);
  --lighter-border-color-hover: var(--error-base);
  --lighter-text-color-hover: var(--error-base);
  --lighter-bg-color-focus: var(--bg-strong-950);
  --lighter-border-color-focus: var(--error-base);
  --lighter-text-color-focus: var(--error-base);

  --ghost-bg-color: transparent;
  --ghost-border-color: transparent;
  --ghost-text-color: var(--error-base);
  --ghost-bg-color-hover: var(--error-lighter);
  --ghost-border-color-hover: var(--error-lighter);
  --ghost-text-color-hover: var(--error-base);
  --ghost-bg-color-focus: var(--bg-strong-950);
  --ghost-border-color-focus: var(--error-base);
  --ghost-text-color-focus: var(--error-base);
`;

// Options
const filledStyle = css`
  background-color: var(--filled-bg-color);
  border: 1px solid var(--filled-border-color);
  color: var(--filled-text-color);

  &:hover {
    background-color: var(--filled-bg-color-hover);
    border: 1px solid var(--filled-border-color-hover);
    color: var(--filled-text-color-hover);
  }

  &:focus {
    background-color: var(--filled-bg-color-focus);
    border: 1px solid var(--filled-border-color-focus);
    color: var(--filled-text-color-focus);

    outline-color: var(--outline-color);
    outline-style: solid;
    outline-offset: 2px;
    outline-width: 2px;
  }
`;

const strokeStyle = css`
  background-color: var(--stroke-bg-color);
  border: 1px solid var(--stroke-border-color);
  color: var(--stroke-text-color);

  &:hover {
    background-color: var(--stroke-bg-color-hover);
    border: 1px solid var(--stroke-border-color-hover);
    color: var(--stroke-text-color-hover);
  }

  &:focus {
    background-color: var(--stroke-bg-color-focus);
    border: 1px solid var(--stroke-border-color-focus);
    color: var(--stroke-text-color-focus);

    outline-color: var(--outline-color);
    outline-style: solid;
    outline-offset: 2px;
    outline-width: 2px;
  }
`;

const lighterStyle = css`
  background-color: var(--lighter-bg-color);
  border: 1px solid var(--lighter-border-color);
  color: var(--lighter-text-color);

  &:hover {
    background-color: var(--lighter-bg-color-hover);
    border: 1px solid var(--lighter-border-color-hover);
    color: var(--lighter-text-color-hover);
  }

  &:focus {
    background-color: var(--lighter-bg-color-focus);
    border: 1px solid var(--lighter-border-color-focus);
    color: var(--lighter-text-color-focus);

    outline-color: var(--outline-color);
    outline-style: solid;
    outline-offset: 2px;
    outline-width: 2px;
  }
`;

const ghostStyle = css`
  background-color: var(--ghost-bg-color);
  border: 1px solid var(--ghost-border-color);
  color: var(--ghost-text-color);

  &:hover {
    background-color: var(--ghost-bg-color-hover);
    border: 1px solid var(--ghost-border-color-hover);
    color: var(--ghost-text-color-hover);
  }

  &:focus {
    background-color: var(--ghost-bg-color-focus);
    border: 1px solid var(--ghost-border-color-focus);
    color: var(--ghost-text-color-focus);

    outline-color: var(--outline-color);
    outline-style: solid;
    outline-offset: 2px;
    outline-width: 2px;
  }
`;

const BtnWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  white-space: nowrap;

  font-family: var(--text-small-font-family);
  font-size: var(--text-small-font-size);
  font-weight: var(--text-small-font-weight);
  line-height: var(--text-small-line-height);

  cursor: pointer;

  /* Types */
  &.primary {
    ${primaryStyle}
  }
  &.neutral {
    ${neutralStyle}
  }
  &.error {
    ${errorStyle}
  }

  /* Options */
  &.filled {
    ${filledStyle}
  }

  &.stroke {
    ${strokeStyle}
  }

  &.lighter {
    ${lighterStyle}
  }

  &.ghost {
    ${ghostStyle}
  }

  /* Size */
  &.medium {
    padding: 10px 12px;
  }

  &.small {
    padding: 8px 10px;
  }

  &.xsmall {
    padding: 6px 8px;
  }

  &.xxsmall {
    padding: 4px 6px;
  }

  &:disabled,
  &.primary:disabled,
  &.primary.filled:disabled,
  &.primary.stroked:disabled,
  &.primary.lighter:disabled,
  &.primary.ghost:disabled,
  &.neutral:disabled,
  &.neutral.filled:disabled,
  &.neutral.stroked:disabled,
  &.neutral.lighter:disabled,
  &.neutral.ghost:disabled,
  &.error:disabled,
  &.error.filled:disabled,
  &.error.stroked:disabled,
  &.error.lighter:disabled,
  &.error.ghost:disabled {
    background-color: var(--bg-surface-800);
    border: 1px solid var(--bg-surface-800);
    color: var(--text-disabled-300);
    cursor: not-allowed;
    pointer-events: none;
  }
`;
