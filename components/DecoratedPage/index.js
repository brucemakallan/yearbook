import React from 'react';

import CustomHead from '../CustomHead';
import UserBackground from '../UserBackground';
import useStyles from './styles';

const DecoratedPage = ({ children, hide, pageTitle }) => {
  const classes = useStyles();

  return (
    <>
      <CustomHead page={pageTitle} />
      {!hide && (
        <div className={classes.root}>
          <div className={classes.backgroundLayer}>
            <UserBackground hidden={false}/>
          </div>
          <div className={classes.foregroundLayer}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default DecoratedPage;
