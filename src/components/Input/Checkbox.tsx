import { forwardRef, useImperativeHandle, useRef } from "react";
import styled from "styled-components";
import { RiCheckFill } from "@remixicon/react";

export const Checkbox = forwardRef<HTMLInputElement, any>((props, ref) => {
  const localRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => localRef.current as HTMLInputElement);

  const isChecked =
    props.checked !== undefined
      ? props.checked
      : localRef.current?.checked || false;

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
        aria-checked={isChecked ? "true" : "false"}
        tabIndex={0}
        $checked={isChecked}
      >
        {isChecked && <RiCheckFill />}
      </CheckboxWrapper>

      {props.right && <span>{props.right}</span>}
    </CheckboxLabel>
  );
});

const CheckboxLabel = styled.label`
  font-family: var(--text-sm-font-family);
  font-size: var(--text-sm-font-size);
  font-weight: var(--text-sm-font-weight);
  line-height: 18px; /*var(--text-sm-line-height);*/
  color: var(--text-primary);
  display: flex;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
`;

const CheckboxWrapper = styled.div<{ $checked: boolean }>`
  width: 16px;
  height: 16px;
  margin: 1px;
  border: 2px solid var(--bg-surface-800);
  border-width: 2px;
  border-style: solid;
  border-color: ${({ $checked }) =>
    $checked ? "var(--primary-base)" : "var(--bg-surface-800)"};
  background-color: ${({ $checked }) =>
    $checked ? "var(--primary-base)" : "transparent"};
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    border-color: ${({ $checked }) =>
      $checked ? "var(--primary-darker)" : "var(--bg-surface-700)"};
    background-color: ${({ $checked }) =>
      $checked ? "var(--primary-darker)" : "transparent"};
  }
  &:focus {
    border-color: ${({ $checked }) =>
      $checked ? "var(--primary-dark)" : "var(--primary-base)"};
    background-color: ${({ $checked }) =>
      $checked ? "var(--primary-dark)" : "transparent"};
  }
`;
