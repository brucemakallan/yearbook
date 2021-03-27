import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Formik, Form } from 'formik';

import MainHeading from '../MainHeading';
import renderInputWrapper from '../../helpers/formHelpers';

const ResetPasswordLayout = ({
  formInputFields,
  initialFormValues,
  handleSubmit,
  handleCancel,
  classes,
  heading,
  subHeading,
  buttonText,
}) => (
  <Grid container justify="center" alignContent="center">
    <Grid item xs={11} sm={6} md={4} lg={3}>
      <MainHeading text={heading} />
      <Typography component='p' align="center">
        {subHeading}
      </Typography>
      <Formik
        initialValues={initialFormValues}
        onSubmit={ handleSubmit }
      >
        <Form>
          {formInputFields.map((field) => renderInputWrapper(field))}
          <Button
            variant="contained"
            type='submit'
            color="primary"
          >
            {buttonText}
          </Button>
          <Button
            variant="contained"
            type="button"
            color="secondary"
            className={classes.btn}
            onClick={handleCancel}
          >
            CANCEL
          </Button>
        </Form>
      </Formik>
    </Grid>
  </Grid>
);

export default ResetPasswordLayout;
