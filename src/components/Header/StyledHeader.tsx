import styled from 'styled-components';
import { StyleProps } from 'src/interfaces/StyleProps';

const Header = styled.header`
  width: 100%;
  height: 60px;
  position: fixed;
  opacity: 1;
  background-color: ${({ theme }: StyleProps) => theme.colors.ui.header};
  color: ${({ theme }: StyleProps) => theme.colors.common.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 35px;
`;

const StyledHeader: React.FC = ({ children }): JSX.Element => {
  return <Header>{children}</Header>;
};

export default StyledHeader;
