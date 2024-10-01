import { useEffect, useState } from "react";
import styled from "styled-components";
import { getThemeColors } from "../../theme";

const StyledLabel = styled.label<{ $isActive?: boolean }>`
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
  border: ${({ theme, $isActive }) =>
    $isActive && `1px solid ${getThemeColors(theme).border.default}`};
  padding: 5px 20px;
  flex: 1;
  text-align: center;
  cursor: pointer;
`;

const Radio = (props: any) => {
  return (
    <StyledLabel htmlFor={props.label} $isActive={props.isActive}>
      {props.label}
      <input
        id={props.label}
        style={{ width: 0, height: 0 }}
        name={props.name}
        checked={props.checked}
        type="radio"
        onChange={props.onChange}
        value={props.value}
      />
    </StyledLabel>
  );
};

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
          name={name}
          key={option.label}
          {...option}
          isActive={value === option.value}
          onChange={() => handleChange(option.value)}
        />
      ))}
    </Container>
  );
}

export default Switcher;
