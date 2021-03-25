import '../styles/globals.css'

import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { CloudinaryContext } from 'cloudinary-react';
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie';

import { getToken } from '../helpers/jwt';

const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_URL,
  credentials: 'include',
  request: (operation) => {
    const token = getToken();
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  cache: new InMemoryCache(),
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <CookiesProvider>
      <ApolloProvider client={client}>
        <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_NAME}>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </CloudinaryContext>
      </ApolloProvider>
    </CookiesProvider>
  );
}

export default MyApp


