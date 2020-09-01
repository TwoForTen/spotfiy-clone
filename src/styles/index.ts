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
    html{
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      
    }
    body{
      background-color: #121212;
      overflow-x: hidden;
    }
    button{
      border: none;
      outline: none;
    }
    a{
      color: initial;
      text-decoration: none;
    }
    ul{
      list-style: none;
    }
`;
