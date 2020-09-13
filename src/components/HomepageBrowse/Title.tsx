import styled from 'styled-components';
import { ThemeProp } from 'src/interfaces/ThemeProp';

interface Props {
  description: {
    title: string;
    description?: string;
  };
}

const TracksTitleContainer = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 16px;
`;

const BrowseTitle = styled.h2`
  color: ${({ theme }: ThemeProp) => theme.colors.common.white};
  padding: 4px 0;
  text-transform: capitalize;
`;

const Subtitle = styled.span`
  color: ${({ theme }: ThemeProp) => theme.colors.ui.text};
  font-size: 13px;
`;

const Title: React.FC<Props> = ({ description }): JSX.Element => {
  return (
    <TracksTitleContainer>
      <div>
        <BrowseTitle>{description.title.replace(/\_/g, ' ')}</BrowseTitle>
        <Subtitle>{description.description}</Subtitle>
      </div>
    </TracksTitleContainer>
  );
};

export default Title;
