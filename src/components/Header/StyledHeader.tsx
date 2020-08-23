import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';

const Header = styled.header`
  width: ${({ theme }: ThemeProp) =>
    `calc(${theme.shape.ui.header.width} - ${theme.shape.ui.sidebar.width})`};
  height: ${({ theme }: ThemeProp) => theme.shape.ui.header.height};
  position: fixed;
  right: 0;
  opacity: 1;
  background-color: ${({ theme }: ThemeProp) => theme.colors.ui.header};
  color: ${({ theme }: ThemeProp) => theme.colors.common.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 35px;
  z-index: 1;
`;

const StyledHeader: React.FC = ({ children }): JSX.Element => {
  return <Header>{children}</Header>;
};

export default StyledHeader;
