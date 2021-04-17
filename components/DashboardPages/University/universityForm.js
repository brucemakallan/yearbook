import React from 'react';
import get from 'lodash/get';
import { Formik, Form } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import universityValidation from './validation';
import Loader from '../../Loader';
import Feedback from '../../Feedback';
import renderInputWrapper from '../../../helpers/formHelpers';
import useStyles from './styles';
import { initialValues, formInputFields } from './universityFormFields';
import { institutionTypes } from '../../../helpers/enums';
import {
  GET_ALL_UNIVERSITIES_QUERY, GET_INSTITUTIONS_BY_CLASSIFICATION_QUERY,
} from '../../../graphql/university/queries';
import {
  CREATE_UNIVERSITY_MUTATION, UPDATE_UNIVERSITY_MUTATION,
} from '../../../graphql/university/mutations';

const UniversityForm = ({
  university,
  fullWidth,
  handleOnCompleted,
  profileValues,
}) => {
  const classes = useStyles();

  const [values, setValues] = React.useState(initialValues(profileValues?.institutionType));

  const [createUniversity, createUniversityResponse] = useMutation(CREATE_UNIVERSITY_MUTATION, {
    onCompleted: handleOnCompleted,
  });
  const [updateUniversity, updateUniversityResponse] = useMutation(UPDATE_UNIVERSITY_MUTATION, {
    onCompleted: handleOnCompleted,
  });

  React.useEffect(() => {
    if (university) {
      setValues({
        ...university,
        institutionType: institutionTypes.find(({ value }) => value === university?.classification),
      });
    }
  }, [university]);

  const handleChange = (e, autocompleteValue) => { // autocompleteValue: { value, label }
    const { id } = e.target;

    if (id.includes('institutionType')) {
      setValues({
        ...values,
        institutionType: autocompleteValue,
      });
    }
  };

  const refetchQueries = [
    {
      query: GET_ALL_UNIVERSITIES_QUERY,
    },
    {
      query: GET_INSTITUTIONS_BY_CLASSIFICATION_QUERY,
      variables: {
        classification: profileValues?.institutionType?.value || 0,
      },
    },
  ];

  const handleSubmit = async ({ name, institutionType }) => {
    try {
      const createUniversityArgs = {
        refetchQueries,
        variables: {
          universityName: name,
          classification: institutionType.value,
        },
      };
      const updateUniversityArgs = {
        refetchQueries,
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

  const disableInstituteType = !!profileValues?.institutionType?.label;

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
                {formInputFields({
                  handleChange,
                  values,
                  disableInstituteType,
                }).map((field) => renderInputWrapper(field))}
                <Grid container spacing={2}>
                  <Button variant="contained" type='submit' color="primary">
                    {`${university ? 'UPDATE' : 'CREATE'} INSTITUTION`}
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
