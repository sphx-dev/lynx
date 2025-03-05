import { forwardRef, useImperativeHandle, useRef } from "react";
import styled from "styled-components";
import { CheckIcon } from "@radix-ui/react-icons";

export const Checkbox = forwardRef<HTMLInputElement, any>((props, ref) => {
  const localRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => localRef.current as HTMLInputElement);
  return (
    <CheckboxLabel>
      {props.left && <span>{props.left}</span>}
      <input
        ref={localRef}
        type="checkbox"
        {...props}
        style={{ position: "absolute", clipPath: "inset(50%)" }}
      />

      <CheckboxWrapper
        role="checkbox"
        aria-checked={localRef?.current?.checked ? "true" : "false"}
        tabIndex={0}
      >
        {localRef?.current?.checked && <CheckIconStyled />}
      </CheckboxWrapper>

      {props.right && <span>{props.right}</span>}
    </CheckboxLabel>
  );
});

const CheckIconStyled = styled(CheckIcon)`
  width: 25px;
  height: 25px;
  position: absolute;
`;

const CheckboxLabel = styled.label`
  font-family: var(--text-sm-font-family);
  font-size: var(--text-sm-font-size);
  font-weight: var(--text-sm-font-weight);
  line-height: var(--text-sm-line-height);
  color: var(--text-primary);
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const CheckboxWrapper = styled.div`
  width: 18px;
  height: 18px;
  border: 1px solid var(--border-default);
  border-radius: var(--border-radius-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  &:active {
    border-color: var(--border-active);
  }
  &:hover {
    border-color: var(--border-hovered);
  }
  &:focus {
    outline: none;
    border-color: var(--border-active);
  }
`;
