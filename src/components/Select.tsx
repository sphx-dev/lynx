import React, { useState } from "react"
import Select, { StylesConfig } from "react-select"
import { useTheme } from "styled-components"
import { useTranslation } from "react-i18next"
import { getThemeColors } from "../theme"

export interface OptionType {
  label: string
  value: string
}

const TakeProfitStopLossSelect: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null)
  const { t } = useTranslation()

  const options: OptionType[] = [
    { value: "takeProfit", label: t("takeProfit") },
    { value: "stopLoss", label: t("Stop loss") },
  ]
  const handleChange = (option: any | null) => {
    // TODO: fix type for option
    setSelectedOption(option)
    console.log(`Option selected:`, option)
  }
  const appTheme = useTheme()

  const customTheme = (theme: any) => ({
    ...theme,
    borderRadius: appTheme.borderRadius.md,
    colors: {
      ...theme.colors,
      primary: appTheme.colors.selectedTheme.background.button,
      neutral80: appTheme.colors.selectedTheme.text.primary,
      primary25: "transparent",
    },
  })

  const customStyles: StylesConfig<OptionType> = {
    container: (styles) => ({
      ...styles,
    }),
    control: (styles) => ({
      ...styles,
      ...appTheme.fonts.typography.textMd,
      backgroundColor: appTheme.colors.selectedTheme.background.input,
      boxShadow: "none",
      // borderRadius: "4px",
      // minHeight: "60px",

      border: `2px solid ${appTheme.colors.selectedTheme.border.default}`,
      "&:hover": {
        border: `2px solid ${appTheme.colors.selectedTheme.border.hovered}`,
      },
      "&:active": {
        borderCo: `2px solid ${appTheme.colors.selectedTheme.border.hovered}`,
      },
      "&:focus": {
        border: `2px solid ${appTheme.colors.selectedTheme.border.hovered}`,
      },
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: appTheme.colors.selectedTheme.background.dropdown, // Assuming a dark teal background as in your picture
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      // backgroundColor: "transparent",
      color: isSelected
        ? getThemeColors(appTheme).text.primary
        : getThemeColors(appTheme).text.tertiary,
      backgroundColor: isFocused
        ? getThemeColors(appTheme).background.button
        : "transparent",
    }),
    // singleValue: (styles) => ({
    //   ...styles,
    //   color: '#bbe1fa',
    // }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: "#bbe1fa",
      display: "block",
      marginRight: "8px",
      paddingLeft: "2px",
      paddingBottom: "0px",
      paddingTop: "0px",
      paddingRight: "2px",
      borderRadius: appTheme.borderRadius.sm,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  }
  return (
    <div>
      <Select
        theme={customTheme}
        value={selectedOption || options[0]}
        onChange={handleChange}
        options={options}
        styles={customStyles}
      />
    </div>
  )
}

export default TakeProfitStopLossSelect
