import { ThemeProvider } from 'styled-components';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import "bootstrap/dist/css/bootstrap.min.css"
import { themes as appThemes } from '../src/theme';

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: appThemes.light,
      dark: appThemes.dark,
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
  })];
