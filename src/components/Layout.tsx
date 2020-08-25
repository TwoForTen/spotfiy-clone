import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';

const StyledLayout = styled.div`
  position: relative;
  padding-top: ${({ theme }: ThemeProp) => theme.shape.ui.header.height};
  padding-left: ${({ theme }: ThemeProp) => theme.shape.ui.sidebar.width};
  padding-right: 35px;
`;

const Layout: React.FC = ({ children }): JSX.Element => {
  return <StyledLayout>{children}</StyledLayout>;
};

export default Layout;
