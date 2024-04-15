import common from "./common"

const darkTheme = {
  ...common,
  background: {
    gradientPrimary: common.palette.gradient.darkPrimary,
    gradientSecondary: common.palette.gradient.greenSecondary,
    input: common.palette.surface["800"],
    button: common.palette.surface["700"],
    dropdown: common.palette.surface["900"],
    primary: common.palette.primary["950"],
  },
  divider: {
    primary: common.lightGreen,
    secondary: common.blue4,
  },
  border: {
    default: common.lightGreen,
    hovered: common.greenPlaceholder,
  },
  tab: {
    activeBackground: common.green2,
    activeBorder: common.aquaGreen,
  },
  navbar: {
    text: common.green5,
    activeText: common.blue2,
  },
  input: {
    primary: {
      background: {
        default: common.palette.surface["800"],
        hovered: common.palette.surface["700"],
        disabled: common.palette.surface["900"],
      },
      border: {
        focused: common.palette.secondary["500"],
      },
    },
    error: {
      background: {
        default: common.palette.error["300"],
        hovered: common.palette.error["200"],
        disabled: common.palette.error["400"],
      },
      border: {
        focused: common.palette.error["100"],
      },
    },
  },
  button: {
    primary: {
      background: {
        default: common.palette.gradient.primaryBlue,
        hovered: common.palette.primary["500"],
        disabled: common.palette.gradient.primaryBlueDark,
        pressed: common.palette.primary["700"],
      },
      border: {
        focused: common.palette.secondary["500"],
      },
    },
    secondary: {
      background: {
        default: common.palette.surface["700"],
        hovered: common.palette.surface["600"],
        disabled: common.palette.surface["800"],
        pressed: common.palette.surface["700"],
      },
      border: {
        focused: common.palette.secondary["500"],
      },
    },
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#E6E6E6",
    tertiary: "#9D9D9D",
    error: common.negative3,
    secondaryActive: common.palette.secondary["600"],
    secondaryLink: common.palette.secondary["700"],
  },
}

export default darkTheme
