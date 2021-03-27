import React from 'react';

import Box from '@material-ui/core/Box';

import useStyles from '../styles';

const ContentWrapper = ({
  children,
  value,
  index,
  ...other
}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`nav-tabpanel-${index}`}
    aria-labelledby={`nav-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box>
        {children}
      </Box>
    )}
  </div>
);

const PageContent = ({ children, tabValue, tabIndex }) => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <ContentWrapper
        value={tabValue}
        index={tabIndex}
        children={children}
      />
    </div>
  );
};

export default PageContent;
