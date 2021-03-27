import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import CustomHead from '../components/CustomHead'
import DecoratedPage from '../components/DecoratedPage';
import { images } from '../styles/global-theme';

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

  return (
    <div>
      <CustomHead />
      <main>
        <DecoratedPage>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <img className={classes.logo} src={images.logo} alt="yearbook" />
              <Typography variant="h2" gutterBottom>Welcome to Yearbook</Typography>
              <Typography variant="body2" className={classes.tagline}>
                Connecting you with your friends within the same University / School.
              </Typography>
              <Grid container spacing={2} justify="space-between">
                <Grid item>
                  <Link href="/register">
                    <Button color="secondary">REGISTER</Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/login">
                    <Button color="secondary">LOGIN</Button>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </DecoratedPage>
      </main>
    </div>
  );
};

export default LandingPage;
