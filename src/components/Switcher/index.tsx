import { useEffect, useState } from "react";
import styled from "styled-components";

const Radio = styled.button<{ $isActive?: boolean }>`
  font-family: var(--text-sm-font-family);
  font-size: var(--text-sm-font-size);
  font-weight: var(--text-sm-font-weight);
  line-height: var(--text-sm-line-height);
  border-radius: var(--border-radius-md);
  color: var(--text-secondary);
  background-color: transparent;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  padding: 4px 0px;
  flex: 1;
  text-align: center;
  cursor: pointer;

  &.active {
    font-family: var(--action-sm-bold-font-family);
    font-size: var(--action-sm-bold-font-size);
    font-weight: var(--action-sm-bold-font-weight);
    line-height: var(--action-sm-bold-line-height);
    color: var(--text-primary);
    background-color: var(--background-button);
    border-color: var(--border-default);
  }

  &:focus-visible {
    outline: 1px solid var(--input-border-focused);
  }
`;

const Container = styled.div`
  border: 1px solid var(--border-default);
  border-radius: var(--border-radius-md);
  width: 100%;
  padding: 6px 8px;
  background-color: var(--alpha-dark5);
  border-color: var(--border-hovered);
  display: flex;
  align-items: center;
`;

interface Option<T> {
  label: string;
  value: T;
}

interface Props<T> {
  defaultValue?: T;
  options: Option<T>[];
  name: string;
  onChange?: (value: T) => void;
}

function Switcher<T>({
  defaultValue,
  options,
  name,
  onChange,
}: Readonly<Props<T>>) {
  const [value, setValue] = useState<T>(defaultValue ?? options[0].value);

  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== value) {
      setValue(defaultValue);
    }
  }, [defaultValue, value]);

  const handleChange = (value: T) => {
    setValue(value);
    if (onChange) {
      onChange(value);
    }
  };
  return (
    <Container>
      {options.map(option => (
        <Radio
          type="button"
          name={name}
          key={option.label}
          $isActive={value === option.value}
          className={value === option.value ? "active" : ""}
          onClick={() => handleChange(option.value)}
        >
          {option.label}
        </Radio>
      ))}
    </Container>
  );
}

export default Switcher;
