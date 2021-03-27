import React from 'react';
import clsx from 'clsx';

import useStyles from '../styles';
import PageHeader from './PageHeader';
import PageContent from './PageContent';

const Page = ({
  icon,
  title,
  handleChange,
  children,
  tabLinks,
  whiteBackground,
  tabValue = 0,
  tabIndex = 0,
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.page, whiteBackground ? classes.whiteBackground : '')}>
      <PageHeader
        icon={icon}
        title={title}
        tabValue={tabValue}
        handleChange={handleChange}
        tabLinks={tabLinks}
      />
      <PageContent
        tabValue={tabValue}
        tabIndex={tabIndex}
      >
        {children}
      </PageContent>
    </div>
  );
};

export default Page;