import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  text: {
    textAlign: 'center',
  },
  hr: {
    width: 100,
    height: 4,
    border: 'none',
    backgroundSize: '100% auto',
    // eslint-disable-next-line max-len
    backgroundImage: `linear-gradient(to right, ${theme.palette.accent.main} 0%, ${theme.palette.secondary.main} 100%)`,
  },
}));

const MainHeading = ({ text }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant='h1' component='h1' className={classes.text}>
        {text}
      </Typography>
      <hr className={classes.hr} />
    </>
  );
};
export default MainHeading;
