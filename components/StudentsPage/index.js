import React from 'react';
import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

import { GET_ALL_PROFILES_IN_UNIVERSITY_QUERY } from '../../graphql/profile/queries';
import TableView from '../TableView';
import Loader from '../Loader';
import Feedback from '../Feedback';
import PageWithSidebar from '../DashboardComponents/PageWithSidebar';
import { institutionTypes } from '../../helpers/enums';

const renderDisplayPicture = (classes) => (value, data, _updateValue) => {
  const { rowData, tableData, rowIndex } = data;
  const firstName = rowData[3];
  const profile = tableData[rowIndex];

  if (profile.user.discardedAt) {
    return (
      <Tooltip title="Deactivated User" placement="right">
        <Badge variant="dot" color="secondary">
          <Avatar alt={firstName} src={value} className={classes.avatar} />
        </Badge>
      </Tooltip>
    );
  }

  return <Avatar alt={firstName} src={value} className={classes.avatar} />;
};

const renderRegistrationNumber = (value, { rowData }, _updateValue) => (
  value || '-'
);

const noFilterSortSearch = {
  filter: false,
  sort: false,
  searchable: false,
  download: false,
};

const conditionalColumns = (students) => {
  if (students?.[0]?.course?.department?.university?.classification === institutionTypes[0].value) {
    return [
      {
        name: 'course.department.name',
        label: 'Department',
      },
      {
        name: 'course.name',
        label: 'Course',
      },
    ];
  }

  return [];
};

const columns = (classes, students) => [
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
      customBodyRender: renderRegistrationNumber,
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
    label: 'Institution',
    options: {
      filter: false,
    },
  },
  ...conditionalColumns(students),
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

const StudentsPage = ({
  title = 'ALL STUDENTS',
  children,
  onTableChange,
  whiteBackground,
  query = GET_ALL_PROFILES_IN_UNIVERSITY_QUERY,
  queryKey = 'allProfilesInUniversity',
}) => {
  const classes = useStyles();
  const router = useRouter();

  const [students, setStudents] = React.useState([]);

  const getAllStudents = useQuery(query);

  React.useEffect(() => {
    if (get(getAllStudents.data, queryKey)) {
      const profiles = get(getAllStudents.data, queryKey);
      setStudents(profiles.filter((profile) => !!get(profile, 'course.id')));
    }
  }, [getAllStudents, queryKey]);

  const onRowClick = (rowData, _rowMeta) => {
    const id = rowData[0];
    router.push(`/dashboard/profile/${id}`);
  };

  return (
    <PageWithSidebar title={title} whiteBackground={whiteBackground}>
      {getAllStudents.loading && <Loader />}
      {getAllStudents.error && (
        <Feedback
          open={!!getAllStudents.error}
          feedbackMessage={getAllStudents.error}
          severity='error'
          type='error'
        />
      )}
      {!!children && (
        <Box className={classes.box}>
          {children}
        </Box>
      )}
      {getAllStudents.data && (
        <TableView
          title={'STUDENTS'}
          data={students}
          columns={columns(classes, students)}
          onTableChange={onTableChange}
          onRowClick={onRowClick}
        />
      )}
    </PageWithSidebar>
  );
};

export default StudentsPage;
