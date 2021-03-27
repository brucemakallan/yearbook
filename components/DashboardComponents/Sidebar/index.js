import React from 'react';
import clsx from 'clsx';
import { Swipeable } from 'react-swipeable';
import { useRouter } from 'next/router';

import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import SidebarButton from './SidebarButton';
import useStyles from '../styles';
import ShareIcons from '../../ShareIcons';
import sidebarRoutes from './sidebarRoutes';

const Sidebar = ({ className, hideSideBar }) => {
  const classes = useStyles();

  const router = useRouter();
  const sidebarFields = sidebarRoutes(router);

  return (
    <div className={clsx(classes.sidebar, className)}>
      <Swipeable onSwipedLeft={hideSideBar} className={classes.swipeable}>
        {sidebarFields.map((field, index) => ((field.divider)
          ? <Divider key={index} />
          : <SidebarButton key={field.id} field={field} hideSideBar={hideSideBar} />))
        }

        <Divider className={classes.divider} />

        <div className={classes.footer}>
          <ShareIcons />
          <Divider className={classes.divider} />
          <Typography variant="body2">
            <Link target="_blank" rel="noopener" href="/policies">&bull; Cookies Policy</Link>
          </Typography>
        </div>
      </Swipeable>
    </div>
  );
};

export default Sidebar;
