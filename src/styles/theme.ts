import { DefaultTheme } from 'styled-components';
import { lighten, darken } from 'polished';

export const theme: DefaultTheme = {
  colors: {
    primary: {
      main: '#1DB954',
      lighten: () => lighten(0.2, theme.colors.primary.main),
      darken: () => darken(0.2, theme.colors.primary.main),
    },
    common: {
      white: '#FFFFFF',
      black: '#191414',
    },
  },
  shape: {
    borderRadius: 5,
  },
};
