import React from 'react';
import get from 'lodash/get';
import noop from 'lodash/noop';
import { Formik, Form } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import universityValidation from './validation';
import Loader from '../../../components/Loader';
import Feedback from '../../../components/Feedback';
import renderInputWrapper, { setQueryVariable } from '../../../helpers/formHelpers';
import useStyles from './styles';
import { GET_ALL_UNIVERSITIES_QUERY } from '../../../graphql/university/queries';
import {
  CREATE_UNIVERSITY_MUTATION,
  UPDATE_UNIVERSITY_MUTATION,
} from '../../../graphql/university/mutations';

const updateAllUniversitiesCache = (store, { data: { createUniversity } }) => {
  const { allUniversities } = store.readQuery({
    query: GET_ALL_UNIVERSITIES_QUERY,
  });

  store.writeQuery({
    query: GET_ALL_UNIVERSITIES_QUERY,
    data: {
      allUniversities: [...allUniversities, createUniversity],
    },
  });
};

const formInputFields = [
  {
    id: 'name',
    placeholder: 'University Name',
  },
];

const initialValues = {
  name: '',
};

const UniversityForm = ({ university, fullWidth, isDialog }) => {
  const classes = useStyles();

  const router = useRouter();

  const [values, setValues] = React.useState(initialValues);

  const [createUniversity, createUniversityResponse] = useMutation(CREATE_UNIVERSITY_MUTATION);
  const [updateUniversity, updateUniversityResponse] = useMutation(UPDATE_UNIVERSITY_MUTATION);

  React.useEffect(() => {
    const success = (
      get(updateUniversityResponse, 'data.updateUniversity.id')
      || get(createUniversityResponse, 'data.createUniversity.id')
    );

    if (university) setValues(university);
    if (success && !isDialog) router.back();
    if (success && isDialog) {
      setQueryVariable(success);
    }
  }, [createUniversityResponse, isDialog, university, updateUniversityResponse]);

  const handleSubmit = async ({ name }) => {
    try {
      const createUniversityArgs = {
        variables: {
          universityName: name,
        },
        update: isDialog ? noop : updateAllUniversitiesCache,
      };
      const updateUniversityArgs = {
        variables: {
          universityUpdates: {
            universityId: get(university, 'id'),
            newName: name,
          },
        },
      };

      if (university) {
        await updateUniversity(updateUniversityArgs);
      } else {
        await createUniversity(createUniversityArgs);
      }
    } catch (err) {
      return err;
    }
  };

  return (
    <>
      {createUniversityResponse.loading && <Loader />}
      {(createUniversityResponse.error || updateUniversityResponse.error) && (
        <Feedback
          open={!!createUniversityResponse.error || !!updateUniversityResponse.error}
          feedbackMessage={createUniversityResponse.error || updateUniversityResponse.error}
          severity='error'
          type='error'
        />
      )}
      {(createUniversityResponse.data || updateUniversityResponse.data) && (
        <Feedback
          open={!!createUniversityResponse.data || !!updateUniversityResponse.data}
          feedbackMessage={createUniversityResponse.data ? 'Successfully created' : 'Successfully updated'}
          severity='success'
          type='success'
        />
      )}
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={12} md={fullWidth ? 12 : 6} lg={fullWidth ? 12 : 6}>
          <Formik
            enableReinitialize
            initialValues={values}
            validationSchema={universityValidation}
            onSubmit={handleSubmit}
          >
            <Paper className={classes.paper} elevation={0}>
              <Form className={classes.form}>
                {formInputFields.map((field) => renderInputWrapper(field))}
                <Grid container spacing={2}>
                  <Button variant="contained" type='submit' color="primary">
                    {`${university ? 'UPDATE' : 'CREATE'} UNIVERSITY`}
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

export default UniversityForm;
