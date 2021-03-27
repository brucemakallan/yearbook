import React from 'react';

// import EqualizerIcon from '@material-ui/icons/Equalizer';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import BusinessIcon from '@material-ui/icons/Business';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonIcon from '@material-ui/icons/Person';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SmsIcon from '@material-ui/icons/Sms';

import YearBookIcon from '../YearBookIcon';
import Yearbook from './Yearbook';
import Profile from './Profile';
import ChatPage from './ChatPage';

import EditUniversity from './University/editUniversity';
import AllUniversities from './University/allUniversities';
import CreateUniversity from './University/createUniversity';

import AllStudents from './Student/allStudents';

import DepartmentsInUniversity from './Department/departmentsInUniversity';
import CreateDepartment from './Department/createDepartment';
import EditDepartment from './Department/editDepartment';

import CoursesInDepartment from './Course/coursesInDepartment';
import CreateCourse from './Course/createCourse';
import EditCourse from './Course/editCourse';
import { clearToken } from '../../helpers/jwt';

import EditProfile from '../CreateProfilePages/editProfile/editProfileForm';
import Gallery from '../PhotosPages';
import SupportPage from './ContactForm';

import ChatWindowPage from './ChatWindowPage';

const UNIVERSITIES_URL = '/dashboard/universities';
const YEARBOOKS_URL = '/dashboard';
const CHAT_URL = '/dashboard/chat';
const CHAT_WINDOW_URL = '/dashboard/chat-window';
const DEPARTMENTS_URL = '/dashboard/universities/:universityId/departments';
const COURSES_URL = '/dashboard/universities/:universityId/departments/:departmentId/courses';
const STUDENTS_URL = '/dashboard/students';
const PROFILE_URL = '/dashboard/profile';
const SUPPORT_URL = '/dashboard/support';

// Please Note that because of the behavior of the switch, the order of these routes matters
export const crudRoutes = (props) => [
  // Universities
  {
    id: 'createUniversity',
    link: `${UNIVERSITIES_URL}/new`,
    page: <CreateUniversity {...props} />,
    protectedRoute: true,
  },
  {
    id: 'editUniversity',
    link: `${UNIVERSITIES_URL}/:id/edit`,
    page: <EditUniversity {...props} />,
    protectedRoute: true,
  },
  // Departments
  {
    id: 'departments',
    link: DEPARTMENTS_URL,
    page: <DepartmentsInUniversity {...props} />,
    protectedRoute: true,
  },
  {
    id: 'createDepartment',
    link: `${DEPARTMENTS_URL}/new`,
    page: <CreateDepartment {...props} />,
    protectedRoute: true,
  },
  {
    id: 'editDepartment',
    link: `${DEPARTMENTS_URL}/:id/edit`,
    page: <EditDepartment {...props} />,
    protectedRoute: true,
  },
  // Courses
  {
    id: 'courses',
    link: COURSES_URL,
    page: <CoursesInDepartment {...props} />,
    protectedRoute: true,
  },
  {
    id: 'createCourse',
    link: `${COURSES_URL}/new`,
    page: <CreateCourse {...props} />,
    protectedRoute: true,
  },
  {
    id: 'editCourse',
    link: `${COURSES_URL}/:id/edit`,
    page: <EditCourse {...props} />,
    protectedRoute: true,
  },
  // Student Profile
  {
    id: 'student-profile',
    link: `${STUDENTS_URL}/:id`,
    page: <Profile {...props} />,
    protectedRoute: true,
  },
  {
    id: 'edit-profile',
    link: `${PROFILE_URL}/:id/edit`,
    page: <EditProfile {...props} />,
    protectedRoute: true,
  },
  {
    id: 'student-gallery',
    link: `${PROFILE_URL}/:id/gallery`,
    page: <Gallery {...props} />,
    protectedRoute: true,
  },
  {
    id: 'chat-window',
    link: CHAT_WINDOW_URL,
    page: <ChatWindowPage {...props} />,
    protectedRoute: true,
  },
];

export const sidebarRoutes = (props) => [
  {
    id: 'YEARBOOK',
    icon: <YearBookIcon />,
    component: 'h1',
    link: '/',
    action: () => { props.router.push('/'); },
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
    page: <Yearbook {...props} />,
    protectedRoute: true,
  },
  {
    id: 'chat',
    link: CHAT_URL,
    icon: <SmsIcon />,
    page: <ChatPage {...props} />,
    protectedRoute: true,
  },
  {
    id: 'universities',
    link: UNIVERSITIES_URL,
    icon: <BusinessIcon />,
    page: <AllUniversities {...props} />,
    protectedRoute: true,
  },
  {
    id: 'students',
    link: STUDENTS_URL,
    icon: <SupervisorAccountIcon />,
    page: <AllStudents {...props} />,
    protectedRoute: true,
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
    page: <Profile {...props} />,
    protectedRoute: true,
  },
  {
    id: 'support',
    link: SUPPORT_URL,
    icon: <ContactSupportIcon />,
    page: <SupportPage {...props} />,
    protectedRoute: true,
  },
  {
    id: 'logout',
    icon: <ExitToAppIcon />,
    action: () => clearToken(),
  },
];
