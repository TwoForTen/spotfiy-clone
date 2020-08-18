import {
  createGlobalStyle,
  DefaultTheme,
  GlobalStyleComponent,
} from 'styled-components';

export const GlobalStyle: GlobalStyleComponent<
  {},
  DefaultTheme
> = createGlobalStyle`
    *, *:after, *:before{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;
