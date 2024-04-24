// TradingPairSelector.tsx
import React from "react"
import Select, { SingleValue, StylesConfig, components } from "react-select"
import { useTheme } from "styled-components"
import { getThemeColors } from "../../theme"
import { OptionType } from "../Select"
import Icon from "../Icon"

const { Control } = components

const IconControl = ({ children, ...props }: any) => (
  <Control {...props}>
    <Icon icon="PairSelectIcon" stroke="none" size="medium" />
    {children}
  </Control>
)

interface TradingPairOption {
  value: string
  label: string
}
interface TradingPairSelectorProps {
  options?: TradingPairOption[]
  onChange?: any
  value?: TradingPairOption | null
}

const mockOptions = [
  { value: "btc_usdc", label: "BTC / USDC" },
  { value: "eth_usdc", label: "ETH / USDC" },
  { value: "wtx_usdc", label: "WTX / USDC" },
  // ...add more trading pairs as needed
]

const TradingPairSelector: React.FC<TradingPairSelectorProps> = ({
  options = mockOptions,
  onChange = () => {},
  value = { value: "wtx_usdc", label: "WTX / USDC" },
}) => {
  const appTheme = useTheme() // Renamed to appTheme for clarity
  // Function to customize react-select's theme based on the application's theme
  const customTheme = (theme: any) => ({
    ...theme,
    borderRadius: 0,
    border: "none",
    colors: {
      ...theme.colors,
      neutral80: appTheme.colors.selectedTheme.text.primary,
    },
  })

  const customStyles: StylesConfig<OptionType> = {
    container: (provided: any) => ({
      ...provided,
      maxHeight: "38px",
    }),
    control: (provided: any) => ({
      ...provided,
      ...appTheme.fonts.typography.textMd,
      border: "none",
      boxShadow: "none",
      backgroundColor: "transparent",
      width: "auto",
    }),
    option: (provided, { isSelected, isFocused }) => ({
      ...provided,
      ...appTheme.fonts.typography.textMd,
      color: isSelected
        ? getThemeColors(appTheme).text.primary
        : getThemeColors(appTheme).text.tertiary,
      backgroundColor: isFocused
        ? getThemeColors(appTheme).background.button
        : "transparent",
    }),
    menu: (provided: any) => ({
      ...provided,
      marginTop: 0,
      backgroundColor: appTheme.colors.selectedTheme.background.dropdown,
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      padding: 0,
    }),
    // You can add more custom styles for other parts of the select component if needed
  }

  return (
    <Select
      theme={customTheme}
      styles={customStyles}
      options={options}
      onChange={onChange}
      value={value}
      className="trading-pair-selector"
      classNamePrefix="select"
      placeholder="Select trading pair..."
      isSearchable={false}
      components={{ Control: IconControl }}
    />
  )
}

export default TradingPairSelector
