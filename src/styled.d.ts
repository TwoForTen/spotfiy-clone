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
        faded: string;
      };
      ui: {
        header: string;
        sidebar: string;
        background: string;
        card: string;
        footer: string;
        text: string;
      };
    };
    shape: {
      borderRadius: string;
      ui: {
        sidebar: {
          height: string;
          width: string;
        };
        header: {
          height: string;
          width: string;
        };
        footer: {
          height: string;
          width: string;
        };
      };
    };
  }
}
