import { useEffect, useState } from "react";
import styled from "styled-components";
import { getThemeColors } from "../../theme";

const Radio = styled.button<{ $isActive?: boolean }>`
  ${({ theme, $isActive }) =>
    $isActive
      ? theme.fonts.typography.actionSmBold
      : theme.fonts.typography.textSm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme, $isActive }) =>
    $isActive
      ? getThemeColors(theme).text.primary
      : getThemeColors(theme).text.secondary};
  background-color: ${({ theme, $isActive }) =>
    $isActive ? getThemeColors(theme).background.button : "transparent"};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, $isActive }) =>
    $isActive ? `${getThemeColors(theme).border.default}` : "transparent"};
  padding: 4px 0px;
  flex: 1;
  text-align: center;
  cursor: pointer;

  &:focus-visible {
    outline: 1px solid
      ${({ theme }) => getThemeColors(theme).input.primary.border.focused};
  }
`;

const Container = styled.div`
  border: ${({ theme }) => `1px solid ${getThemeColors(theme).border.default}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 100%;
  padding: 6px 8px;
  background-color: ${({ theme }) => theme.colors.common.palette.alpha.dark5};
  border-color: ${({ theme }) => getThemeColors(theme).border.hovered};
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
          onClick={() => handleChange(option.value)}
        >
          {option.label}
        </Radio>
      ))}
    </Container>
  );
}

export default Switcher;
