import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';

const StyledLayout = styled.div`
  position: relative;
  padding-top: ${({ theme }: ThemeProp) =>
    `calc(${theme.shape.ui.header.height} + 20px)`};
  padding-left: ${({ theme }: ThemeProp) =>
    `calc(${theme.shape.ui.sidebar.width} + 35px)`};
  padding-right: 35px;
`;

const Layout: React.FC = ({ children }): JSX.Element => {
  return <StyledLayout>{children}</StyledLayout>;
};

export default Layout;
