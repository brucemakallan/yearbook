import React from 'react';
import get from 'lodash/get';
import upperCase from 'lodash/upperCase';
import {
  useQuery, useMutation, useApolloClient,
} from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { GET_ALL_COURSES_IN_DEPARTMENT_QUERY } from '../../../graphql/course/queries';
import { DELETE_COURSE_MUTATION } from '../../../graphql/course/mutations';
import TableView from '../../../components/TableView';
import Loader from '../../../components/Loader';
import Feedback from '../../../components/Feedback';
import TableLink from '../../../components/TableLink';
import AlertDialog from '../../../components/AlertDialog';
import tabs from './tabs';
import Page from '../../DashboardComponents/Page';
import { getCurrentDepartmentFromCache } from '../../../helpers/cacheManagement';
import { getToken, getDecodedToken } from '../../../helpers/jwt';

const renderActions = (handleDelete, userId, courses) => (value, _tableMeta, _updateValue) => {
  const course = courses.find((u) => u.id === value);
  const isOwner = !!userId && get(course, 'user.id') === userId;

  return (
    isOwner && (
      <>
        <TableLink text='Edit' link={`courses/${value}/edit`}>
          <Button color="primary"><EditIcon /></Button>
        </TableLink>
        <AlertDialog
          title="Are you sure you want to delete?"
          handleYes={handleDelete(value)}
          buttonText={<DeleteIcon />}
          buttonProps={{
            color: 'secondary',
          }}
        >
          <Typography variant="body2">
            Are you sure you want to delete this Course? This action cannot be undone.
          </Typography>
        </AlertDialog>
      </>
    )
  );
};

const columns = (handleDelete, classes, userId, courses) => [
  {
    name: 'id',
    options: {
      display: false,
      filter: false,
      sort: false,
    },
  },
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'id',
    label: ' ',
    options: {
      filter: false,
      sort: false,
      customBodyRender: renderActions(handleDelete, userId, courses),
      setCellProps: (_value) => ({
        className: classes.right,
      }),
    },
  },
];

const useStyles = makeStyles((theme) => ({
  right: {
    textAlign: 'right',
  },
}));

const CoursesInDepartment = () => {
  const classes = useStyles();
  const router = useRouter();
  const client = useApolloClient();

  const { universityId, departmentId } = router.query;

  const [courses, setCourses] = React.useState([]);

  const getAllCoursesInDepartment = useQuery(GET_ALL_COURSES_IN_DEPARTMENT_QUERY, {
    variables: {
      departmentId,
    },
  });

  const [deleteCourse, deleteCourseResponse] = useMutation(DELETE_COURSE_MUTATION);

  const currentDepartment = getCurrentDepartmentFromCache(client, universityId, departmentId, router);
  const currentDepartmentName = get(currentDepartment, 'name');

  const user = getDecodedToken(getToken());
  const userId = get(user, '_id');

  React.useEffect(() => {
    if (get(getAllCoursesInDepartment, 'data.allCoursesInDepartment')) {
      const allCoursesInDepartment = get(
        getAllCoursesInDepartment,
        'data.allCoursesInDepartment'
      );

      setCourses(allCoursesInDepartment);
    }
  }, [client, getAllCoursesInDepartment]);

  const handleDelete = (id) => async (_event) => {
    try {
      await deleteCourse({
        variables: {
          courseId: id,
        },
      });

      getAllCoursesInDepartment.refetch();
    } catch (err) {
      return err;
    }
  };

  return (
    <Page
      title={currentDepartmentName ? upperCase(currentDepartmentName) : 'COURSES'}
      tabLinks={tabs(universityId, departmentId)}
    >
      {getAllCoursesInDepartment.loading && <Loader />}
      {(getAllCoursesInDepartment.error || deleteCourseResponse.error) && (
        <Feedback
          open={!!getAllCoursesInDepartment.error || !!deleteCourseResponse.error}
          feedbackMessage={getAllCoursesInDepartment.error || deleteCourseResponse.error}
          severity='error'
          type='error'
        />
      )}
      {deleteCourseResponse.data && (
        <Feedback
          open={!!deleteCourseResponse.data}
          feedbackMessage='Successfully deleted'
          severity='success'
          type='success'
        />
      )}
      {getAllCoursesInDepartment.data && (
        <TableView
          title={currentDepartmentName ? `COURSES (${upperCase(currentDepartmentName)})` : 'COURSES'}
          data={courses}
          columns={columns(handleDelete, classes, userId, courses)}
        />
      )}
    </Page>
  );
};

export default CoursesInDepartment;
