import styled from "styled-components";
interface Props {
  $active?: boolean;
  $isBuy?: boolean;
}

export const TabButtonContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 6px;
  padding: 0px;
  width: 100%;
  height: 32px;
`;

export const TabButton = styled.button<Props>`
  flex: 1;
  font-family: var(--text-small-font-family);
  font-size: var(--text-small-font-size);
  font-weight: var(--text-small-font-weight);
  line-height: var(--text-small-line-height);
  color: var(--text-strong-950);

  border: 1px solid var(--stroke-sub-300);
  border-radius: 6px;
  background-color: var(--bg-surface-900);

  ${({ $active, $isBuy }) => {
    if ($active) {
      if ($isBuy) {
        return `
          border: 1px solid var(--text-bull);
          background-color: var(--text-bull);
        `;
      } else {
        return `
          border: 1px solid var(--text-bear);
          background-color: var(--text-bear);
        `;
      }
    }
    return "";
  }}
`;

export default TabButton;
