import common from "./common"

const lightTheme = {
  ...common,
  background: {
    gradientPrimary: common.palette.gradient.green,
    gradientSecondary: common.palette.gradient.greenSecondary,
    input: common.palette.surface["800"],
    button: common.palette.surface["700"],
    dropdown: common.palette.surface["900"],
  },
  divider: {
    primary: common.lightGreen,
    secondary: common.blue4,
  },
  border: {
    default: common.greenPlaceholder,
    hovered: common.lightGreen,
  },
  tab: {
    activeBackground: common.green2,
    activeBorder: common.aquaGreen,
  },
  navbar: {
    text: common.green5,
    activeText: common.blue2,
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#E6E6E6",
    tertiary: "#9D9D9D",
    error: common.palette.error["50"],
  },
}

export default lightTheme
