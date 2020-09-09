import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';
import { ArtistAlbum } from 'src/pages/app/artist/[artist]';
import Link from 'next/link';

interface Props {
  album: ArtistAlbum;
}

interface StyleProps extends ThemeProp {
  $type?: TitleType;
}

enum TitleType {
  Album = 'album',
}

const StyledPlaylistCard = styled.div`
  width: min-content;
  height: 100%;
  position: relative;
  margin: 10px;
`;

const ImageContainer = styled.div`
  width: 280px;
  height: 280px;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
`;

const TitleContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.a`
  color: ${({ theme, $type }: StyleProps) =>
    $type === TitleType.Album
      ? theme.colors.ui.text
      : theme.colors.common.white};
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    color: ${({ theme }: ThemeProp) => theme.colors.common.white};
    text-decoration: underline;
  }
`;

const PlaylistCard: React.FC<Props> = ({ album }): JSX.Element => {
  return (
    <StyledPlaylistCard>
      <Link href={`/app/album/${album.id}`}>
        <a>
          <ImageContainer>
            <Image src={album.imageUrl} alt="" />
          </ImageContainer>
        </a>
      </Link>
      <TitleContainer>
        <Link href={`/app/album/${album.id}`}>
          <Title>{album.name}</Title>
        </Link>
        <Link href={`/app/artist/${album.artist.id}`}>
          <Title $type={TitleType.Album}>{album.artist.name}</Title>
        </Link>
      </TitleContainer>
    </StyledPlaylistCard>
  );
};

export default PlaylistCard;
