import React from 'react';
import get from 'lodash/get';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { GET_ALL_UNIVERSITIES_QUERY } from '../../../graphql/university/queries';
import { DELETE_UNIVERSITY_MUTATION } from '../../../graphql/university/mutations';
import TableView from '../../../components/TableView';
import TableLink from '../../../components/TableLink';
import AlertDialog from '../../../components/AlertDialog';
import PageWithSidebar from '../../../components/DashboardComponents/PageWithSidebar';
import tabs from '../../../components/DashboardPages/University/tabs';
import QueryAlert from '../../../components/QueryAlert';
import { getToken, getDecodedToken } from '../../../helpers/jwt';

const renderName = (value, { rowData }, _updateValue) => (
  <TableLink text={value} label link={`universities/${rowData[0]}/departments`} />
);

const renderActions = (handleDelete, userId, universities) => (value, _tableMeta, _updateValue) => {
  const university = universities.find((u) => u.id === value);
  const isOwner = !!userId && get(university, 'user.id') === userId;

  return (
    isOwner && (
      <>
        <TableLink text='Edit' link={`universities/${value}/edit`}>
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
          Are you sure you want to delete this University? This action cannot be undone.
          </Typography>
        </AlertDialog>
      </>
    )
  );
};

const columns = (handleDelete, classes, userId, universities) => [
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
      customBodyRender: renderActions(handleDelete, userId, universities),
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

const AllUniversities = () => {
  const classes = useStyles();

  const [universities, setUniversities] = React.useState([]);

  const getAllUniversities = useQuery(GET_ALL_UNIVERSITIES_QUERY);
  const [deleteUniversity, deleteUniversityResponse] = useMutation(DELETE_UNIVERSITY_MUTATION);

  const user = getDecodedToken(getToken());
  const userId = get(user, '_id');

  React.useEffect(() => {
    if (get(getAllUniversities, 'data.allUniversities')) {
      const allUniversities = get(getAllUniversities, 'data.allUniversities');
      setUniversities(allUniversities);
    }
  }, [getAllUniversities]);

  const handleDelete = (id) => async (_event) => {
    try {
      await deleteUniversity({
        variables: {
          universityId: id,
        },
      });

      getAllUniversities.refetch();
    } catch (err) {
      return err;
    }
  };

  return (
    <PageWithSidebar
      title="ALL UNIVERSITIES"
      tabs={tabs}
    >
      <QueryAlert queryResponse={{
        loading: getAllUniversities.loading,
        error: getAllUniversities.error || deleteUniversityResponse.error,
      }}/>
      {deleteUniversityResponse.data && (
        <Feedback
          open={!!deleteUniversityResponse.data}
          feedbackMessage='Successfully deleted'
          severity='success'
          type='success'
        />
      )}
      {getAllUniversities.data && (
        <TableView
          title={'UNIVERSITIES'}
          data={universities}
          columns={columns(handleDelete, classes, userId, universities)}
          // TODO: implement delete multiple (only if one owns them)
          // onRowsDelete={(value) => console.log('clicked_value', value)}
        />
      )}
    </PageWithSidebar>
  );
};

export default AllUniversities;
