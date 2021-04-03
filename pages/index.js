import React from 'react';
import get from 'lodash/get';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import DecoratedPage from '../components/DecoratedPage';
import { images } from '../styles/global-theme';
import CustomNextLink from '../components/CustomNextLink';
import { getDecodedToken, getToken } from '../helpers/jwt';

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 500,
    [theme.breakpoints.only('xs')]: {
      minWidth: 300,
    },
  },
  content: {
    textAlign: 'center',
  },
  logo: {
    width: 50,
    marginBottom: theme.spacing(2),
  },
  tagline: {
    marginBottom: theme.spacing(2),
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  const router = useRouter();

  const token = getToken();
  const currentUser = getDecodedToken(token);
  const currentUserId = get(currentUser, '_id');

  React.useEffect(() => {
    if (currentUserId) {
      router.push('/login');
    }
  }, [router, currentUserId]);

  return (
    <DecoratedPage loading={!!currentUserId} loadingText="Verifying your credentials">
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <img className={classes.logo} src={images.logo} alt="yearbook" />
          <Typography variant="h2" gutterBottom>Welcome to Yearbook</Typography>
          <Typography variant="body2" className={classes.tagline}>
            Connecting you with your friends within the same University / School.
          </Typography>
          <Grid container spacing={2} justify="space-between">
            <Grid item>
              <CustomNextLink href="/register">
                <Button color="secondary">REGISTER</Button>
              </CustomNextLink>
            </Grid>
            <Grid item>
              <CustomNextLink href="/login">
                <Button color="secondary">LOGIN</Button>
              </CustomNextLink>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </DecoratedPage>
  );
};

// SSR for SEO
export async function getServerSideProps() {
  return {
    props: {
    },
  };
}

export default LandingPage;
