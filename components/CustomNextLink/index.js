import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
  },
}));

const CustomNextLink = ({
  className,
  href,
  hrefAs,
  children,
}) => {
  const classes = useStyles();

  return (
    <Link href={href} as={hrefAs}>
      <a className={clsx(className, classes.link)}>
        {children}
      </a>
    </Link>
  );
};

export default CustomNextLink;
