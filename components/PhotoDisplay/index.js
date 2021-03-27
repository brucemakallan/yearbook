import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2),
  },
}));

const PhotoDisplay = ({ photos }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {photos.map(({ id, url }) => (
        <Card className={classes.card} key={id}>
          <img src={url} alt="dp" />
        </Card>
      ))}
    </Grid>
  );
};

export default PhotoDisplay;
