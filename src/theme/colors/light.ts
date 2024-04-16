import common from "./common"

const lightTheme = {
  ...common,
  background: {
    gradientPrimary: common.palette.gradient.green,
    gradientSecondary: common.palette.gradient.greenSecondary,
    input: common.palette.surface["800"],
    button: common.palette.surface["700"],
    dropdown: common.palette.surface["900"],
    primary: common.palette.primary["950"],
    gradientSurface: common.palette.gradient.surface,
  },
  divider: {
    primary: common.palette.surface["700"],
    secondary: common.blue4,
  },
  border: {
    default: common.greenPlaceholder,
    hovered: common.lightGreen,
    active: '#13DCDE',
  },
  tab: {
    activeBackground: common.green2,
    activeBorder: common.aquaGreen,
  },
  tableTabs: {
    color: common.palette.primary["700"],
    colorActive: common.palette.primary["300"],
    border: common.palette.primary["300"],
    background: `linear-gradient(180deg, #133F5B 0%, #062B41 24%, #031D2C 80.5%)`,
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
        pressed: common.palette.surface["700"],
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
    error: common.palette.error["50"],
    secondaryActive: common.palette.secondary["600"],
    secondaryLink: common.palette.secondary["700"],
    primaryLink: common.palette.primary["500"],
  },
}

export default lightTheme
