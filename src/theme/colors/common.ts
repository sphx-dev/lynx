export const palette = {
  neutral: {
    n0: "#ffffff",
    n10: "#fafafa",
    n20: "#f5f5f5",
    n30: "#ececeb",
    n40: "#e0e0df",
    n50: "#c4c3c2",
    n60: "#b5b4b3",
    n70: "#a9a8a6",
    n80: "#9b9a98",
    n90: "#8d8b89",
    n100: "#7e7d7a",
    n200: "#706e6b",
    n300: "#62605d",
    n400: "#565450",
    n500: "#484542",
    n600: "#3c3935",
    n700: "#2B2A28",
    n800: "#1d1a15",
    n900: "#14120F",
    n1000: "#110E09",
    n1100: "#0D0B08",
  },
  gradient: {
    gold: "linear-gradient(180deg, #BE9461 0%, #9C6C3C 100%)",
    green:
      "linear-gradient(90deg, hsla(190, 77%, 17%, 1) 0%, hsla(186, 91%, 13%, 1) 66%, hsla(202, 69%, 13%, 1) 100%)",
    greenSecondary:
      "linear-gradient(90deg, hsla(183, 78%, 18%, 1) 0%, hsla(186, 76%, 17%, 1) 66%, hsla(191, 74%, 15%, 1) 100%)",
    darkPrimary:
      "linear-gradient(180deg, #14494f 0%, #164851 9.35%, #194957 51%, #0A2536 100%)",
    primaryBlue: "linear-gradient(180deg, #3185C3 0%, #68AEE4 100%)",
    primaryBlueDark: "linear-gradient(180deg, #3185C3 0%, #68AEE4 100%)",
},
  alpha: {
    white1: "rgb(255,255,255,0.01)",
    white5: "rgb(255,255,255,0.5)",
    white8: "rgb(255,255,255,0.08)",
    white10: "rgb(255,255,255,0.1)",
    white25: "rgba(255, 255, 255, 0.25)",
    gray60: "rgba(17, 14, 9, 0.6)",
    white60: "rgba(250, 250, 250, 0.6)",
    red10: "rgb(241,43,43,0.1)",
    red15: "rgb(241,43,43,0.15)",
    red5: "rgb(241,43,43,0.05)",
    green20: "rgba(127,212,130,0.2)",
    green10: "rgba(127,212,130,0.1)",
    green5: "rgba(127,212,130,0.05)",
    dark5: "rgba(0,0,0,0.05)",
    lightButton: "linear-gradient(180deg, #EEEEEE 0%, #E0E0E0 100%)",
    lightButtonHover: "linear-gradient(180deg, #E6E6E6 0%, #CCCCCC 100%)",
    darkButton: "linear-gradient(180deg, #282727 0%, #191818 100%)",
    darkButtonHover: "linear-gradient(180deg, #383838 0%, #1E1E1E 100%)",
  },
  primary: {
    50: "#fbfdff",
    100: "#EEF7FD",
    200: "#D8EEFB",
    300: "#BBE1F8",
    400: "#94CFF4",
    500: "#65BBF0",
    600: "#2DA2EA",
    700: "#137DBE",
    800: "#0B486E",
    900: "#06293E",
    950: "#051E2E",
  },
  secondary: {
    50: "#FAFFFE",
    100: "#ECFEFD",
    200: "#D4FCFA",
    300: "#B3F9F6",
    400: "#88F6F1",
    500: "#54F2EA",
    600: "#17EEE3",
    700: "#0DABA3",
    800: "#086662",
    900: "#053D3A",
    950: "#042F2D",
  },
  surface: {
    50: "#FBFDFD",
    100: "#EFF6F8",
    200: "#DCECEF",
    300: "#C0DDE2",
    400: "#9DCAD2",
    500: "#72B2BE",
    600: "#48909D",
    700: "#2D5A62",
    800: "#143A44",
    900: "#13272A",
    950: "#102023",
  },
  error: {
    50: "#CA363E",
    100: "#8D252B",
    200: "#55171A",
    300: "#330E10",
    400: "#280B0C",
  },
}

const common = {
  white: "#ffffff",

  aquaGreen: "#12CCD1", //active tab border
  lightGreen: "#235D64", // divider, hovered border
  green2: "#1d535b", // tab active bg
  green3: "#9ab4bb", // pill text
  green4: "#16555c", // button bg
  green5: "#059a8b", // navbar text
  greenLabel: "#4f8087",
  greenPlaceholder: "#3e7577", // input placeholder, border
  greenText: "#9eb8bb", //input text, active label
  greenNeon: "#12dde0", // chart last price
  greenPrimary: "#0c303a", //chart bg

  pink: "#fe237a", // last price change

  blue: "#60b7f9",
  blue2: "#62c6ff", // active navbar, order book text
  blue3: "#1f567b", // order list header bg
  blue4: "#275571", // order list borders, head text
  blueDefault: "#031a27", // body bg
  blueDark: "#03273b", // order list bg
  blueDark2: "#041e2f", // navbar bg
  negative: "#2E1515",
  negative2: "#820000",
  negative3: "#FF4848",
  positive: "#1E4D39",
  positive1: "#4C972E",
  palette,
}

export default common
