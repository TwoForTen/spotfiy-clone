import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ThemeProp } from 'src/interfaces/ThemeProp';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from 'src/store';
import { ActionCreators } from 'redux-undo';
import { storeUrl } from 'src/store/History/actions';

interface StyleProps {
  disabled: boolean;
}

const StyledNavigation = styled.div`
  display: flex;
  z-index: 1;
`;

const StyledHeaderButton = styled.button`
  width: fit-content;
  height: fit-content;
  padding: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ theme }: ThemeProp) => theme.colors.common.black};
  cursor: ${({ disabled }: StyleProps) => disabled && 'not-allowed'};
  & > svg {
    fill: ${({ disabled }: StyleProps) =>
      disabled ? 'rgba(255,255,255,0.6)' : '#fff'};
  }
`;

const Navigation: React.FC = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch();
  const history = useSelector((state: GlobalState) => state.history);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    !active && dispatch(storeUrl({ href: router.pathname, as: router.asPath }));
    setActive(false);
  }, [router.asPath]);

  useEffect(() => {
    dispatch(ActionCreators.clearHistory());
  }, []);

  return (
    <StyledNavigation>
      <StyledHeaderButton
        disabled={history.past.length < 1}
        onClick={() => {
          setActive(true);
          dispatch(ActionCreators.undo());
          router.push(
            history.past[history.past.length - 1].href,
            history.past[history.past.length - 1].as
          );
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="30px"
          height="30px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
        </svg>
      </StyledHeaderButton>
      <StyledHeaderButton
        style={{ marginLeft: '14px' }}
        disabled={history.future.length < 1}
        onClick={() => {
          setActive(true);
          dispatch(ActionCreators.redo());
          router.push(
            history.future[history.future.length - 1].href,
            history.future[history.future.length - 1].as
          );
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="30px"
          height="30px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      </StyledHeaderButton>
    </StyledNavigation>
  );
};

export default Navigation;
