import merge from "lodash.merge";
import { darkTheme, Theme } from "@rainbow-me/rainbowkit";
import useTheme from "./useTheme";
export const useRainbowKitDarkTheme = () => {
  const { theme } = useTheme();

  const rainbowDarkTheme = merge(darkTheme(), {
    colors: {
      modalBackground: theme.colors.selectedTheme.background.gradientSurface,
    },
    radii: {
      modal: "12px",
    },
    fonts: {
      body: theme.fonts.fontStyles.medium,
    },
  } as Theme);

  return { rainbowDarkTheme };
};
