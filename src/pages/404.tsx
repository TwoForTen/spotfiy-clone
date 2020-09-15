import { NextPage } from 'next';
import styled from 'styled-components';
import Layout from 'src/components/Layout';

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  margin: 35px auto;
  justify-content: center;
  align-items: center;
`;

const Message = styled.h2`
  color: white;
`;

const NotFound: NextPage = (): JSX.Element => {
  return (
    <Layout>
      <Container>
        <Message>Sorry, content not found.</Message>
      </Container>
    </Layout>
  );
};

export default NotFound;
