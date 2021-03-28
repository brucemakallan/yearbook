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

import { GET_ALL_DEPARTMENTS_IN_UNIVERSITY_QUERY } from '../../../../../graphql/department/queries';
import { DELETE_DEPARTMENT_MUTATION } from '../../../../../graphql/department/mutations';
import TableView from '../../../../../components/TableView';
import Loader from '../../../../../components/Loader';
import Feedback from '../../../../../components/Feedback';
import TableLink from '../../../../../components/TableLink';
import AlertDialog from '../../../../../components/AlertDialog';
import tabs from '../../../../../components/DashboardPages/Department/tabs';
import PageWithSidebar from '../../../../../components/DashboardComponents/PageWithSidebar';
import getCurrentUniversityFromCache from '../../../../../helpers/cacheManagement';
import { getToken, getDecodedToken } from '../../../../../helpers/jwt';

const renderName = (value, { rowData }, _updateValue) => (
  <TableLink text={value} label link={`departments/${rowData[0]}/courses`} />
);

const renderActions = (handleDelete, userId, departments) => (value, _tableMeta, _updateValue) => {
  const department = departments.find((u) => u.id === value);
  const isOwner = !!userId && get(department, 'user.id') === userId;

  return (
    isOwner && (
      <>
        <TableLink text='Edit' link={`departments/${value}/edit`}>
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
        Are you sure you want to delete this Department? This action cannot be undone.
          </Typography>
        </AlertDialog>
      </>
    )
  );
};

const columns = (handleDelete, classes, userId, departments) => [
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
    options: {
      customBodyRender: renderName,
    },
  },
  {
    name: 'id',
    label: ' ',
    options: {
      filter: false,
      sort: false,
      customBodyRender: renderActions(handleDelete, userId, departments),
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

const DepartmentsInUniversity = () => {
  const classes = useStyles();
  const client = useApolloClient();
  const router = useRouter();
  const { universityId } = router.query;

  const [departments, setDepartments] = React.useState([]);

  const getAllDepartmentsInUniversity = useQuery(GET_ALL_DEPARTMENTS_IN_UNIVERSITY_QUERY, {
    variables: {
      universityId,
    },
  });

  const [deleteDepartment, deleteDepartmentResponse] = useMutation(DELETE_DEPARTMENT_MUTATION);

  const currentUniversity = getCurrentUniversityFromCache(client, universityId, router);
  const currentUniversityName = get(currentUniversity, 'name');

  const user = getDecodedToken(getToken());
  const userId = get(user, '_id');

  React.useEffect(() => {
    if (get(getAllDepartmentsInUniversity, 'data.allDepartmentsInUniversity')) {
      const allDepartmentsInUniversity = get(
        getAllDepartmentsInUniversity,
        'data.allDepartmentsInUniversity'
      );

      setDepartments(allDepartmentsInUniversity);
    }
  }, [client, getAllDepartmentsInUniversity, universityId]);

  const handleDelete = (id) => async (_event) => {
    try {
      await deleteDepartment({
        variables: {
          departmentId: id,
        },
      });

      getAllDepartmentsInUniversity.refetch();
    } catch (err) {
      return err;
    }
  };

  return (
    <PageWithSidebar
      title={currentUniversityName ? upperCase(currentUniversityName) : 'DEPARTMENTS'}
      tabs={tabs(universityId)}
    >
      {getAllDepartmentsInUniversity.loading && <Loader />}
      {(getAllDepartmentsInUniversity.error || deleteDepartmentResponse.error) && (
        <Feedback
          open={!!getAllDepartmentsInUniversity.error || !!deleteDepartmentResponse.error}
          feedbackMessage={getAllDepartmentsInUniversity.error || deleteDepartmentResponse.error}
          severity='error'
          type='error'
        />
      )}
      {deleteDepartmentResponse.data && (
        <Feedback
          open={!!deleteDepartmentResponse.data}
          feedbackMessage='Successfully deleted'
          severity='success'
          type='success'
        />
      )}
      {getAllDepartmentsInUniversity.data && (
        <TableView
          title={currentUniversityName ? `DEPARTMENTS (${upperCase(currentUniversityName)})` : 'DEPARTMENTS'}
          data={departments}
          columns={columns(handleDelete, classes, userId, departments)}
        />
      )}
    </PageWithSidebar>
  );
};

export default DepartmentsInUniversity;
