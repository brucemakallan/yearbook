import React from 'react';
import { Formik, Form } from 'formik';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Loader from '../../Loader';
import Feedback from '../../Feedback';
import renderInputWrapper from '../../../helpers/formHelpers';
import CustomAlert from '../../CustomAlert';
import { formInputFields } from './selectCourseFormValues';

// TIP: Use Layout files to separate Logic from JSX if the logic files is too long
const SelectCourseFormLayout = ({
  classes,
  data,
  error,
  fetchError,
  validationError,
  profile,
  values,
  universities,
  departments,
  courses,
  disabled,
  fetching,
  isEditing,
  handleSubmit,
  handleChange,
  handleOnCompleted,
}) => {
  if (fetchError) {
    return (
      <Feedback
        open={!!fetchError}
        feedbackMessage={fetchError}
        severity='error'
        type='error'
      />
    );
  }

  return (
    <>
      {fetching && <Loader />}
      {data && (
        <Feedback
          open={!!data}
          feedbackMessage={isEditing ? 'All Good' : 'Congrats! You now have a Profile 🙂'}
          severity='success'
          type='success'
        />
      )}
      {(error || validationError) && (
        <Feedback
          open={!!error || !!validationError}
          feedbackMessage={error || validationError}
          severity='error'
          type='error'
        />

      )}
      {!isEditing && (
        <>
          <CustomAlert
            severity="info"
            message={`
            TIP: If you can't find the Institution, Department, 
            or Course you're looking for, use the plus icon to add it.
            You need an Institution to create a Department and a Department to create a Course
            `}
          />
          <Typography variant="overline">{'Registration Number: '}</Typography>
          <Typography variant="overline" color="primary">{profile.registrationNumber}</Typography>
        </>
      )}

      <Formik enableReinitialize initialValues={values} onSubmit={handleSubmit}>
        <Form className={classes.form}>
          {
            formInputFields({
              handleChange,
              handleOnCompleted,
              universities,
              departments,
              courses,
              values,
              disabled,
              isEditing,
            }).map((field) => renderInputWrapper(field))
          }
          <Grid container justify="space-between" className={classes.buttons}>
            <Button
              variant="contained"
              type='submit'
              color="primary"
              disabled={fetching}
            >
              {isEditing ? 'Save' : 'Finish'}
            </Button>
          </Grid>
        </Form>
      </Formik>
    </>
  );
};

export default SelectCourseFormLayout;
