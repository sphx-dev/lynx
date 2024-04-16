import React, { useState } from "react"
import Group from "../Group"
import Stack from "../Stack"
import styled from "styled-components"

enum Option {
  LONG = "LONG",
  SHORT = "SHORT",
}
interface Props {
  isSelected: boolean
  onClick: () => void
  children?: React.ReactNode
}
const StyledTab = styled.button<Props>`
  ${({ theme }) => theme.fonts.typography.textMd}
  background-color: ${({ isSelected, theme }) =>
    isSelected
      ? theme.colors.selectedTheme.tab.activeBackground
      : theme.colors.common.palette.alpha.dark5};
  padding: 10px 20px;
  border: none;
  border-top: ${({ isSelected, theme }) =>
    isSelected
      ? `3px solid ${theme.colors.selectedTheme.tab.activeBorder}`
      : `3px solid ${theme.colors.common.palette.alpha.dark5}`};
  outline: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.selectedTheme.text.primary};
    flex: 1;
`
const Tab = ({ isSelected, onClick, children }: Props) => {
  return (
    <StyledTab isSelected={isSelected} onClick={onClick}>
      {children}
    </StyledTab>
  )
}
const TradingOptions = () => {
  const [selectedOption, setSelectedOption] = useState("LONG")

  const isSelected = (option: any) => selectedOption === option

  return (
    <Stack align="stretch" style={{ width: "100%" }}>
      <Group spacing={0} fluid>
        <Tab
          isSelected={isSelected(Option.LONG)}
          onClick={() => setSelectedOption(Option.LONG)}
        >
          {Option.LONG}
        </Tab>
        <Tab
          isSelected={isSelected(Option.SHORT)}
          onClick={() => setSelectedOption(Option.SHORT)}
        >
          {Option.SHORT}
        </Tab>
      </Group>
      {isSelected(Option.LONG) ? (
        <div> Long content </div>
      ) : (
        <div> Short content </div>
      )}
    </Stack>
  )
}

export default TradingOptions
