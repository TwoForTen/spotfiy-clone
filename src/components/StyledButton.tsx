import styled, { DefaultTheme, css } from 'styled-components';

interface Props {
  primary?: boolean;
  secondary?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

interface ThemeProp extends Props {
  theme: DefaultTheme;
}

const Button = styled.button`
  ${({ theme, primary, secondary }: ThemeProp) => css`
    border: none;
    outline: none;
    padding: 10px;
    margin: 20px;
    min-width: 120px;
    color: ${theme.colors.common.white};
    font-size: 20px;
    border-radius: ${theme.shape.borderRadius};
    background-color: ${primary
      ? theme.colors.primary.main
      : secondary && theme.colors.common.black};
    transition: 300ms;
    z-index: 1;
    &:hover {
      cursor: pointer;
      background-color: ${primary
        ? theme.colors.primary.lighten
        : secondary && theme.colors.common.black};
    }
  `}
`;

const StyledButton: React.FC<Props> = ({
  primary,
  secondary,
  onClick,
  children,
}): JSX.Element => {
  return (
    <Button primary={primary} secondary={secondary} onClick={onClick}>
      {children}
    </Button>
  );
};

export default StyledButton;
