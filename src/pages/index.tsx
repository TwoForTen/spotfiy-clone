import { NextPage } from 'next';

const Home: NextPage = (): JSX.Element => {
  return (
    <>
      <button
        onClick={async () => {
          const data = await (
            await fetch(
              'https://accounts.spotify.com/authorize?client_id=6acd672c6265465db9cd34ce4a2381e1&response_type=token&redirect_uri=http://localhost:3000&scope=user-read-private%20user-read-email'
            )
          ).json();
          console.log(data);
        }}
      >
        Authorize
      </button>
    </>
  );
};

export default Home;
