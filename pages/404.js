import React from 'react';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { images } from '../styles/global-theme';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  pageNotFoundImage: {
    maxWidth: '100%',
    maxHeight: '70vh',
  },
  pageNotFoundText: {
    padding: theme.spacing(1),
  },
}));

const PageNotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={images.meditation} className={classes.pageNotFoundImage} alt="page not found" />

      <div className={classes.pageNotFoundText}>
        <Typography variant="h2" gutterBottom>
          Looks like you're a little lost <span role="img" aria-label="smile-emogi">🙂</span>
        </Typography>
        <Typography variant="body1">
          No worries! We can guide you back to the <Link href="/">homepage</Link>.
        </Typography>
      </div>
    </div>
  );
};

export default PageNotFound;
