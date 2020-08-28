import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';
import { useState, useEffect } from 'react';

interface StyleProps extends ThemeProp {
  scrollPos?: number;
}

const Header = styled.header`
  width: ${({ theme }: ThemeProp) =>
    `calc(${theme.shape.ui.header.width} - ${theme.shape.ui.sidebar.width})`};
  height: ${({ theme }: ThemeProp) => theme.shape.ui.header.height};
  position: fixed;
  right: 0;
  color: ${({ theme }: ThemeProp) => theme.colors.common.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 35px;
  z-index: 1;
`;

const HeaderBackground = styled.div.attrs(({ scrollPos }: StyleProps) => ({
  style: {
    opacity: scrollPos,
  },
}))`
  background-color: ${({ theme }: StyleProps) => theme.colors.ui.header};
  position: fixed;
  top: 0;
  right: 0;
  width: ${({ theme }: StyleProps) =>
    `calc(${theme.shape.ui.header.width} - ${theme.shape.ui.sidebar.width})`};
  height: ${({ theme }: StyleProps) => theme.shape.ui.header.height};
`;

const StyledHeader: React.FC = ({ children }): JSX.Element => {
  const [scrollPos, setScrollPos] = useState<number>(0);
  useEffect(() => {
    const getScrollPos = () => {
      setScrollPos(
        Math.min(Math.abs(document.body.getBoundingClientRect().y / 100), 1)
      );
    };

    window.addEventListener('scroll', getScrollPos);
    return () => window.removeEventListener('scroll', getScrollPos);
  }, []);

  return (
    <Header>
      <HeaderBackground scrollPos={scrollPos} />
      {children}
    </Header>
  );
};

export default StyledHeader;
