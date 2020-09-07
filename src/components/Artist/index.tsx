import Header from './Header';

interface Props {
  info: string;
}

const ArtistComponent: React.FC<Props> = ({ info }): JSX.Element => {
  return <Header info={info} />;
};

export default ArtistComponent;
