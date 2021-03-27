import React from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { CloudinaryContext } from 'cloudinary-react';
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie';
import { useRouter } from 'next/router'

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'; // reset CSS

import globalTheme from '../styles/global-theme';
import CookiesDialog from '../components/CookiesDialog';
import { alreadyAcceptedCookies } from '../helpers/cookies';
import { getToken } from '../helpers/jwt';

const client = new ApolloClient({
  uri: process.env.BACKEND_URL,
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

const exceptions = [
  '/',
  '/policies',
  '/login',
  '/register',
];

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const accepted = (!exceptions.includes(router.pathname)) && (alreadyAcceptedCookies() !== 'accepted');

  return (
    <CookiesProvider>
      <ApolloProvider client={client}>
        <CloudinaryContext cloudName={process.env.CLOUDINARY_NAME}>
          <RecoilRoot>
            <ThemeProvider theme={globalTheme}>
              <CssBaseline />
              <div className="App">
                <Component {...pageProps} />
                {!!accepted && <CookiesDialog />}
              </div>
            </ThemeProvider>
          </RecoilRoot>
        </CloudinaryContext>
      </ApolloProvider>
    </CookiesProvider>
  );
}

export default MyApp
