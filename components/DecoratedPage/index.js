import React from 'react';

import UserBackground from '../UserBackground';
import useStyles from './styles';

const DecoratedPage = ({ children, hide }) => {
  const classes = useStyles();

  return (
    !hide && (
      <div className={classes.root}>
        <div className={classes.backgroundLayer}>
          <UserBackground hidden={false}/>
        </div>
        <div className={classes.foregroundLayer}>
          {children}
        </div>
      </div>
    )
  );
};

export default DecoratedPage;
