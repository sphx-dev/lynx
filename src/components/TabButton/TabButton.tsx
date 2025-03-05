import styled from "styled-components";
interface Props {
  $active?: boolean;
}

export const TabButton = styled.button<Props>`
  font-family: var(--action-sm-bold-font-family);
  font-size: var(--action-sm-bold-font-size);
  font-weight: var(--action-sm-bold-font-weight);
  line-height: var(--action-sm-bold-line-height);
  outline: none;
  border: none;
  border-bottom: 1px solid var(--border-default);
  background-color: ${({ $active, theme }) =>
    $active ? "var(--background-button)" : "transparent"};
  border-top: ${({ $active, theme }) =>
    $active
      ? `2px solid var(--border-active)`
      : `1px solid var(--border-default)`};
  padding: 14px 20px;
  color: var(--text-primary);
  cursor: pointer;

  &:focus-visible {
    outline: 1px solid var(--input-border-focused);
  }
`;

export default TabButton;
