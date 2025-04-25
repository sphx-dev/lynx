import { useEffect, useState } from "react";
import styled from "styled-components";

const Radio = styled.button<{ $isActive?: boolean }>`
  font-family: var(--text-small-font-family);
  font-size: var(--text-small-font-size);
  font-weight: var(--text-small-font-weight);
  line-height: var(--text-small-line-height);

  border-radius: 9999px;
  color: var(--text-strong-950);
  background-color: transparent;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  padding: 1px 0px;
  flex: 1;
  text-align: center;
  cursor: pointer;

  &.active {
    color: #7eeff1;
    background: linear-gradient(
      90deg,
      rgba(53, 230, 233, 0.16) 0%,
      rgba(53, 230, 233, 0) 100%
    );
    border-color: var(--primary-base);
  }

  &:focus-visible {
    outline: 1px solid var(--input-border-focused);
  }
`;

const Container = styled.div`
  border: 1px solid var(--stroke-soft-200);
  border-radius: 9999px;
  width: 100%;
  padding: 3px;
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
