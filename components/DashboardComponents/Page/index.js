import React from 'react';
import clsx from 'clsx';

import useStyles from '../styles';
import PageHeader from './PageHeader';
import PageContent from './PageContent';

const Page = ({
  icon,
  title,
  children,
  tabLinks,
  whiteBackground,
  tabIndex = 0,
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.page, whiteBackground ? classes.whiteBackground : '')}>
      <PageHeader
        icon={icon}
        title={title}
        tabValue={tabIndex}
        tabLinks={tabLinks}
      />
      <PageContent tabValue={tabIndex} tabIndex={tabIndex}>
        {children}
      </PageContent>
    </div>
  );
};

export default Page;
