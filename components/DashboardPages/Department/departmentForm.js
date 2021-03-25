import React from 'react';
import get from 'lodash/get';
import noop from 'lodash/noop';
import upperCase from 'lodash/upperCase';
import { Formik, Form } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import departmentValidation from './validation';
import Loader from '../../../components/Loader';
import Feedback from '../../../components/Feedback';
import renderInputWrapper, { setQueryVariable } from '../../../helpers/formHelpers';
import useStyles from './styles';
import { GET_ALL_DEPARTMENTS_IN_UNIVERSITY_QUERY } from '../../../graphql/department/queries';
import {
  CREATE_DEPARTMENT_MUTATION,
  UPDATE_DEPARTMENT_MUTATION,
} from '../../../graphql/department/mutations';

const updateAllDepartmentsCache = (universityId) => (store, { data: { createDepartment } }) => {
  const { allDepartmentsInUniversity } = store.readQuery({
    query: GET_ALL_DEPARTMENTS_IN_UNIVERSITY_QUERY,
    variables: {
      universityId,
    },
  });

  store.writeQuery({
    query: GET_ALL_DEPARTMENTS_IN_UNIVERSITY_QUERY,
    variables: {
      universityId,
    },
    data: {
      allDepartmentsInUniversity: [...allDepartmentsInUniversity, createDepartment],
    },
  });
};

const formInputFields = [
  {
    id: 'name',
    placeholder: 'Department Name',
  },
];

const initialValues = {
  name: '',
};

const DepartmentForm = ({
  department,
  currentUniversity,
  fullWidth,
  isDialog,
}) => {
  const classes = useStyles();

  const router = useRouter();
  const { universityId } = router.query;

  const [values, setValues] = React.useState(initialValues);

  const [createDepartment, createDepartmentResponse] = useMutation(CREATE_DEPARTMENT_MUTATION);
  const [updateDepartment, updateDepartmentResponse] = useMutation(UPDATE_DEPARTMENT_MUTATION);

  React.useEffect(() => {
    const success = (
      get(updateDepartmentResponse, 'data.updateDepartment.id')
      || get(createDepartmentResponse, 'data.createDepartment.id')
    );

    if (department) setValues(department);
    if (success && !isDialog) router.back();
    if (success && isDialog) {
      setQueryVariable(currentUniversity?.id, success);
    }
  }, [createDepartmentResponse, department, updateDepartmentResponse, isDialog, currentUniversity]);

  const handleSubmit = async ({ name }) => {
    try {
      const createDepartmentArgs = {
        variables: {
          department: {
            name,
            universityId: universityId || get(currentUniversity, 'id'),
          },
        },
        update: isDialog ? noop : updateAllDepartmentsCache(universityId),
      };
      const updateDepartmentArgs = {
        variables: {
          departmentUpdates: {
            departmentId: get(department, 'id'),
            newName: name,
          },
        },
      };

      if (department) {
        await updateDepartment(updateDepartmentArgs);
      } else {
        await createDepartment(createDepartmentArgs);
      }
    } catch (err) {
      return err;
    }
  };

  return (
    <>
      {createDepartmentResponse.loading && <Loader />}
      {(createDepartmentResponse.error || updateDepartmentResponse.error) && (
        <Feedback
          open={!!createDepartmentResponse.error || !!updateDepartmentResponse.error}
          feedbackMessage={createDepartmentResponse.error || updateDepartmentResponse.error}
          severity='error'
          type='error'
        />
      )}
      {(createDepartmentResponse.data || updateDepartmentResponse.data) && (
        <Feedback
          open={!!createDepartmentResponse.data || !!updateDepartmentResponse.data}
          feedbackMessage={createDepartmentResponse.data ? 'Successfully created' : 'Successfully updated'}
          severity='success'
          type='success'
        />
      )}
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={12} md={fullWidth ? 12 : 6} lg={fullWidth ? 12 : 6}>
          <Formik
            enableReinitialize
            initialValues={values}
            validationSchema={departmentValidation}
            onSubmit={handleSubmit}
          >
            <Paper className={classes.paper} elevation={0}>
              <Typography variant="h6" gutterBottom>
                {`${upperCase(currentUniversity.name)}: DEPARTMENT`}
              </Typography>

              <Form className={classes.form}>
                {formInputFields.map((field) => renderInputWrapper(field))}
                <Grid container spacing={2}>
                  <Button variant="contained" type='submit' color="primary">
                    {`${department ? 'UPDATE' : 'CREATE'} DEPARTMENT`}
                  </Button>
                </Grid>
              </Form>
            </Paper>
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default DepartmentForm;
