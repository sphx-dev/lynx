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
};

export const Button = React.forwardRef(
  (
    {
      children,
      type = "primary",
      option = "filled",
      size = "medium",
      ...rest
    }: Props,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <BtnWrapper ref={ref} className={`${type} ${option} ${size}`} {...rest}>
        {children}
      </BtnWrapper>
    );
  }
);

// Types
const primaryStyle = css`
  --bg-color: var(--primary-base);
  --text-color: black;
  background-color: var(--primary-base);
  border: 1px solid var(--primary-base);
  color: black;
`;

const neutralStyle = css`
  --bg-color: var(--bg-white-0);
  --text-color: var(--text-white-0);
  background-color: var(--bg-white-0);
  border: 1px solid var(--bg-white-0);
  color: var(--text-white-0);
`;

const errorStyle = css`
  --bg-color: var(--error-base);
  --text-color: var(--text-white-0);
  background-color: var(--error-base);
  border: 1px solid var(--error-base);
  color: var(--text-white-0);
`;

// Options
const filledStyle = css`
  background-color: var(--bg-color);
  color: var(--text-color);
`;

const strokeStyle = css`
  background-color: transparent;
  color: var(--bg-color);
`;

const lighterStyle = css``;

const ghostStyle = css``;

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
`;
