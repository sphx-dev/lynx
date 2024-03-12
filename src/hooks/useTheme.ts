import { useAppSelector } from "../hooks"
import { selectCurrentTheme } from "../state/preferences"
import { getThemeColors, themes } from "../theme"

const UseTheme = () => {
  const currentTheme = useAppSelector(selectCurrentTheme)
  const theme = themes[currentTheme]
  return {
    theme,
    themeColors: getThemeColors(theme),
  }
}

export default UseTheme
