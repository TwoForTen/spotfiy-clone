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
      black: '#000000',
      faded: '#282828',
    },
    ui: {
      header: '#070707',
      sidebar: '#030303',
      background: '#121212',
      card: '#262626',
      text: '#b3b3b3',
    },
  },
  shape: {
    borderRadius: '5px',
    ui: {
      sidebar: {
        height: '100vh',
        width: '232px',
      },
      header: {
        height: '60px',
        width: '100%',
      },
    },
  },
};
