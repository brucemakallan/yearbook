import React from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  link: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'none',
    },
  },
  backText: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const BackArrow = ({ to, title = 'Back' }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    if (to) history.push(to);
    else history.goBack();
  };

  return (
    <Link onClick={handleClick} className={classes.link}>
      <Typography variant="body2" color="secondary" className={classes.backText} gutterBottom>
        <ArrowBackIcon />
        {title}
      </Typography>
    </Link>
  );
};

export default BackArrow;
