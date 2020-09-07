import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';

const StyledLayout = styled.div`
  position: relative;
  padding-top: ${({ theme }: ThemeProp) => theme.shape.ui.header.height};
  padding-left: ${({ theme }: ThemeProp) => theme.shape.ui.sidebar.width};
  padding-bottom: ${({ theme }: ThemeProp) => theme.shape.ui.footer.height};
`;

const Layout: React.FC = ({ children }): JSX.Element => {
  return <StyledLayout>{children}</StyledLayout>;
};

export default Layout;
