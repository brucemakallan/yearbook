import React from 'react';
import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

import { GET_ALL_PROFILES_QUERY } from '../../../graphql/profile/queries';
import TableView from '../../TableView';
import Loader from '../../Loader';
import Feedback from '../../Feedback';
import Page from '../../DashboardComponents/Page';

const renderDisplayPicture = (classes) => (value, { rowData }, _updateValue) => {
  const firstName = rowData[3];
  return <Avatar alt={firstName} src={value} className={classes.avatar} />;
};

const noFilterSortSearch = {
  filter: false,
  sort: false,
  searchable: false,
  download: false,
};

const columns = (classes) => [
  {
    name: 'id',
    options: {
      display: false,
      ...noFilterSortSearch,
    },
  },
  {
    name: 'displayPicture',
    label: ' ',
    options: {
      ...noFilterSortSearch,
      customBodyRender: renderDisplayPicture(classes),
    },
  },
  {
    name: 'registrationNumber',
    label: 'Reg. No.',
    options: {
      filter: false,
    },
  },
  {
    name: 'user.firstName',
    label: 'First name',
  },
  {
    name: 'user.lastName',
    label: 'Last name',
  },
  {
    name: 'course.department.university.name',
    label: 'University',
    options: {
      filter: false,
    },
  },
  {
    name: 'course.department.name',
    label: 'Department',
  },
  {
    name: 'course.name',
    label: 'Course',
  },
  {
    name: 'year',
    label: 'Year',
  },
];

const useStyles = makeStyles((theme) => ({
  right: {
    textAlign: 'right',
  },
  box: {
    marginBottom: theme.spacing(2),
  },
  avatar: {
    [theme.breakpoints.only('xs')]: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  },
}));

const AllStudents = ({
  children,
  showSideBar,
  handleCollapse,
  pageTitle = 'ALL STUDENTS',
  whiteBackground,
  onTableChange,
}) => {
  const classes = useStyles();
  const router = useRouter();

  const [students, setStudents] = React.useState([]);

  const getAllStudents = useQuery(GET_ALL_PROFILES_QUERY);

  React.useEffect(() => {
    if (get(getAllStudents, 'data.allProfilesInUniversity')) {
      const allProfilesInUniversity = get(getAllStudents, 'data.allProfilesInUniversity');
      setStudents(allProfilesInUniversity.filter((profile) => !!get(profile, 'course.id')));
    }
  }, [getAllStudents]);

  const onRowClick = (rowData, _rowMeta) => {
    const id = rowData[0];
    router.push(`/dashboard/students/${id}`);
  };

  return (
    <Page
      title={pageTitle}
      whiteBackground={whiteBackground}
    >
      {getAllStudents.loading && <Loader />}
      {getAllStudents.error && (
        <Feedback
          open={!!getAllStudents.error}
          feedbackMessage={getAllStudents.error}
          severity='error'
          type='error'
        />
      )}
      <Box className={classes.box}>
        {children}
      </Box>
      {getAllStudents.data && (
        <TableView
          title={'STUDENTS'}
          data={students}
          columns={columns(classes)}
          onTableChange={onTableChange}
          onRowClick={onRowClick}
        />
      )}
    </Page>
  );
};

export default AllStudents;
