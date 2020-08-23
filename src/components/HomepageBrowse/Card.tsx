import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';

interface Props {
  data: {
    id: string;
    name: string;
    imageUrl: string;
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
`;

const Title = styled.h4`
  color: ${({ theme }: ThemeProp) => theme.colors.common.white};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 12px;
`;

const Description = styled.small`
  color: ${({ theme }: ThemeProp) => theme.colors.ui.text};
  font-size: 10px;
`;

const Card: React.FC<Props> = ({ data }): JSX.Element => {
  return (
    <CardRoot>
      <ImageContainer type={data.type}>
        <Image src={data.imageUrl} alt="" />
      </ImageContainer>
      <DescriptionContainer>
        <Title>{data.name}</Title>
        <Description>{data.type}</Description>
      </DescriptionContainer>
    </CardRoot>
  );
};

export default Card;
