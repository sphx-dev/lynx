import styled from "styled-components"
import { getThemeColors } from "../../theme"
interface Props {
  active?: boolean
}

export const TabButton = styled.button<Props>`
  ${({ theme }) => theme.fonts.typography.actionSmBold}
  outline: none;
  border: none;
  border-bottom: ${({ theme }) =>
    `1px solid ${getThemeColors(theme).border.default}`};
  background-color: ${({ active, theme }) =>
    active ? getThemeColors(theme).background.button : "transparent"};
  border-top: ${({ active, theme }) =>
    active
      ? `2px solid ${getThemeColors(theme).border.active}`
      : `1px solid ${getThemeColors(theme).border.default}`};
  padding: 14px 20px;
  color: ${({ theme }) => getThemeColors(theme).text.primary};
`

export default TabButton
