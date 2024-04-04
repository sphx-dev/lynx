// TradingPairSelector.tsx
import React from "react"
import Select, { SingleValue } from "react-select"
import { useTheme } from "styled-components"

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
      neutral80: appTheme.colors.selectedTheme.text.inputDefault,
    },
  })

  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      maxHeight: "38px",
    }),
    control: (provided: any) => ({
      ...provided,
      ...appTheme.fonts.typography.sub2,
      border: "none",
      boxShadow: "none",
      backgroundColor: "transparent",
    }),
    option: (provided: any) => ({
      ...provided,
      ...appTheme.fonts.typography.sub2,
      backgroundColor: "transparent",
      color: appTheme.colors.selectedTheme.text.inputDefault,
    }),
    menu: (provided: any) => ({
      ...provided,
      marginTop: 0,
      backgroundColor: appTheme.colors.selectedTheme.background.main,
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
    />
  )
}

export default TradingPairSelector
