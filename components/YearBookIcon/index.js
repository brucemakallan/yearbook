import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

import { images } from '../../styles/global-theme';

const useStyles = makeStyles((theme) => ({
  imageIcon: {
    height: '100%',
  },
  iconRoot: {
    textAlign: 'center',
  },
}));

const YearBookIcon = () => {
  const classes = useStyles();

  return (
    <Icon className={classes.iconRoot}>
      <img className={classes.imageIcon} src={images.logo} alt="yearbook" />
    </Icon>
  );
};

export default YearBookIcon;
