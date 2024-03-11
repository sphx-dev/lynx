import common from "./common"

const lightTheme = {
  ...common,
  background: {
    main: common.blueDefault,
    default: common.blueDark,
    head: common.blue3,
    gradientPrimary: common.palette.gradient.green,
    gradientSecondary: common.palette.gradient.greenSecondary,
    navbar: common.blueDark2,
    chart: common.greenPrimary,
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
    placeholder: common.greenPlaceholder,
    inputDefault: common.greenText,
    default: common.white,
    primary: common.green3,
    secondary: common.blue4,
    error: common.palette.red.r500,
  },
}

export default lightTheme
