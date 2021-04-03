import React from 'react';

import CustomHead from '../CustomHead';
import UserBackground from '../UserBackground';
import useStyles from './styles';
import Loader from '../Loader';

const DecoratedPage = ({
  children,
  hide,
  pageTitle,
  pageDescription,
  loading,
  loadingText,
}) => {
  const classes = useStyles();

  return (
    <>
      <CustomHead page={pageTitle} pageDescription={pageDescription} />
      {!hide && (
        <div className={classes.root}>
          <div className={classes.backgroundLayer}>
            <UserBackground hidden={false}/>
          </div>
          <div className={classes.foregroundLayer}>
            {loading ? <Loader loadingText={loadingText} /> : children}
          </div>
        </div>
      )}
    </>
  );
};

export default DecoratedPage;
