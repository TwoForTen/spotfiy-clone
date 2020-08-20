import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        main: string;
        lighten: () => string;
        darken: () => string;
      };
      common: {
        white: string;
        black: string;
      };
    };
    shape: {
      borderRadius: number;
    };
  }
}
