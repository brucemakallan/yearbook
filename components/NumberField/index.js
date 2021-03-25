import React from 'react';
import CountUp from 'react-countup';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 150,
    minHeight: 150,
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    border: `4px solid ${theme.palette.purpleHighlight}`,
  },
}));

const NumberField = ({ number = 0, text, icon }) => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      {icon}
      <Typography variant="h1" color="primary">
        <CountUp end={number} />
      </Typography>
      {!!text && <Typography variant="overline">{text}</Typography>}
    </Box>
  );
};

export default NumberField;
