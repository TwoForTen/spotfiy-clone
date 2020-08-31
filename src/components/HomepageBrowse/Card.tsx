import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';

interface Props {
  data: {
    id: string;
    name: string;
    imageUrl: string;
    description?: string;
    type?: string;
  };
}

interface StyleProps {
  type?: string;
}

const CardRoot = styled.figure`
  background-color: ${({ theme }: ThemeProp) => theme.colors.ui.card};
  border-radius: ${({ theme }: ThemeProp) => theme.shape.borderRadius};
  padding: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  cursor: pointer;
  position: relative;
`;

const PlayButton = styled.button`
  border-radius: 50%;
  background-color: ${({ theme }: ThemeProp) => theme.colors.primary.main};
  display: none;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 15px;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.4);
  &:hover {
    background-color: ${({ theme }: ThemeProp) => theme.colors.primary.lighten};
    transform: scale(1.07);
  }
  ${CardRoot}:hover & {
    display: flex;
  }
`;

const ImageContainer = styled.div`
  border-radius: ${({ type }: StyleProps) => type === 'artist' && '50%'};
  width: 100%;
  padding-bottom: 100%;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
  position: relative;
  margin-bottom: 16px;
  overflow: hidden;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const DescriptionContainer = styled.div`
  text-transform: capitalize;
  overflow: hidden;
`;

const Title = styled.h4`
  color: ${({ theme }: ThemeProp) => theme.colors.common.white};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5px;
  font-size: 15px;
`;

const Description = styled.small`
  color: ${({ theme }: ThemeProp) => theme.colors.ui.text};
  font-size: 10px;
  line-height: 16px;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Card: React.FC<Props> = ({ data }): JSX.Element => {
  const router = useRouter();

  return (
    <CardRoot
      onClick={() =>
        router.push(
          `/app/[playlistType]/[playlist]`,
          `/app/${data.type}/${data.id}`
        )
      }
    >
      <ImageContainer type={data.type}>
        <Image src={data.imageUrl} alt="" />
      </ImageContainer>
      <DescriptionContainer>
        <Title>{data.name}</Title>
        <Description>{data.description}</Description>
      </DescriptionContainer>
      <PlayButton>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M8 5v14l11-7z" fill="white" />
        </svg>
      </PlayButton>
    </CardRoot>
  );
};

export default Card;
