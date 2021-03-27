import React from 'react';
import get from 'lodash/get';
import { useApolloClient } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';

import DropdownMenu from '../../DropdownMenu';
import { getStudentProfileFromCache } from '../../../helpers/cacheManagement';
import { clearToken } from '../../../helpers/jwt';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    alignSelf: 'center',
    color: theme.palette.light,
  },
  profile: {
    color: 'white',
    cursor: 'pointer',
  },
}));

const DashboardHeader = ({ icon, title }) => {
  const classes = useStyles();
  const client = useApolloClient();
  const router = useRouter();

  const data = getStudentProfileFromCache(client);
  const id = get(data, 'singleProfile.id');
  const displayPicture = get(data, 'singleProfile.displayPicture');
  const user = get(data, 'singleProfile.user');

  const dropdownClickableComponent = (displayPicture && user)
    ? <Avatar alt={user.firstName} src={displayPicture} className={classes.profile} />
    : <Typography variant="h6" className={classes.profile}>My Profile</Typography>;

  const dropdownList = [
    {
      text: 'Profile',
      icon: <AssignmentIndIcon fontSize="small" />,
      action: () => router.push('/dashboard/profile'),
    },
    {
      text: 'Gallery',
      icon: <PhotoLibraryIcon fontSize="small" />,
      action: () => router.push(`/dashboard/profile/${id}/gallery`),
      hide: !id,
    },
    {
      text: 'Log-out',
      icon: <ExitToAppIcon fontSize="small" />,
      action: () => clearToken(),
    },
  ];

  return (
    <React.Fragment>
      <Typography className={classes.title} variant='h5' noWrap>
        {icon}
        {title}
      </Typography>
      <DropdownMenu
        clickableComponent={dropdownClickableComponent}
        list={dropdownList}
      />
    </React.Fragment>
  );
};

export default DashboardHeader;
