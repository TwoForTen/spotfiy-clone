import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';

const Aside = styled.aside`
  width: ${({ theme }: ThemeProp) => theme.shape.ui.sidebar.width};
  height: ${({ theme }: ThemeProp) => theme.shape.ui.sidebar.height};
  padding: 24px 8px;
  background-color: ${({ theme }: ThemeProp) => theme.colors.ui.sidebar};
  position: fixed;
  z-index: 1;
`;

const StyledSidebar: React.FC = ({ children }): JSX.Element => {
  return <Aside>{children}</Aside>;
};

export default StyledSidebar;
