import React from 'react';

import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import BusinessIcon from '@material-ui/icons/Business';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonIcon from '@material-ui/icons/Person';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SmsIcon from '@material-ui/icons/Sms';

import { clearToken } from '../../../helpers/jwt';
import YearBookIcon from '../../YearBookIcon';

const UNIVERSITIES_URL = '/dashboard/institutions';
const YEARBOOKS_URL = '/dashboard';
const CHAT_URL = '/dashboard/chat';
const STUDENTS_URL = '/dashboard/students';
const PROFILE_URL = '/dashboard/profile';
const SUPPORT_URL = '/dashboard/support';

const sidebarRoutes = (router) => [
  {
    id: 'YEARBOOK',
    icon: <YearBookIcon />,
    component: 'h1',
    action: () => { router?.push('/'); },
  },
  {
    divider: true,
  },
  {
    id: 'apps',
    heading: true,
  },
  {
    id: 'yearbooks',
    link: YEARBOOKS_URL,
    icon: <ImportContactsIcon />,
  },
  {
    id: 'chat',
    link: CHAT_URL,
    icon: <SmsIcon />,
  },
  {
    id: 'universities',
    link: UNIVERSITIES_URL,
    icon: <BusinessIcon />,
  },
  {
    id: 'students',
    link: STUDENTS_URL,
    icon: <SupervisorAccountIcon />,
  },
  {
    divider: true,
  },
  {
    id: 'account',
    heading: true,
  },
  {
    id: 'profile',
    link: PROFILE_URL,
    icon: <PersonIcon />,
  },
  {
    id: 'support',
    link: SUPPORT_URL,
    icon: <ContactSupportIcon />,
  },
  {
    id: 'logout',
    icon: <ExitToAppIcon />,
    action: () => clearToken(),
  },
];

export default sidebarRoutes;
