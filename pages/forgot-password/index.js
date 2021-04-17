import React from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Feedback from '../../components/Feedback';
import MainHeading from '../../components/MainHeading';
import DecoratedPage from '../../components/DecoratedPage';
import { PASSWORD_RESET_LINK_QUERY } from '../../graphql/user/queries';
import useStyles from '../../components/ResetPasswordPages/styles';
import ResetPasswordLayout from '../../components/ResetPasswordPages/resetPasswordLayout';
import Loader from '../../components/Loader';

const formInputFields = [
  {
    id: 'email',
    type: 'email',
    required: true,
  },
];

const initialFormValues = {
  email: '',
};

const ForgotPasswordPage = () => {
  const router = useRouter();
  const classes = useStyles();

  const [passwordResetLink, { error, loading, data }] = useLazyQuery(PASSWORD_RESET_LINK_QUERY);

  const handleSubmit = async (email) => {
    try {
      await passwordResetLink({
        variables: email,
      });
    } catch (err) {
      return err;
    }
  };

  const handleCancel = () => {
    router.push('/login');
  };

  if (data && data.sendPasswordResetLink.isSent) {
    return (
      <DecoratedPage pageTitle="Reset Password">
        <Grid container justify="center" alignContent="center">
          <Grid item xs={11} sm={6} md={4} lg={3}>
            <MainHeading text="Check Email" />
            <Typography component='p' align="center">
              Please check your email for a link to change your password.
            </Typography>
          </Grid>
        </Grid>
      </DecoratedPage>
    );
  }
  return (
    <DecoratedPage pageTitle="Reset Password">
      {loading && <Loader />}
      {error && (
        <Feedback
          open={!!error}
          feedbackMessage={error}
          severity='error'
          type='error'
        />
      )}
      <ResetPasswordLayout
        formInputFields = {formInputFields}
        initialFormValues = {initialFormValues}
        handleSubmit = {handleSubmit}
        handleCancel = {handleCancel}
        classes = {classes}
        heading = {'Find Your Account'}
        subHeading = {'Please enter your email to search for your account.'}
        buttonText = {'SEARCH'}
      />
    </DecoratedPage>
  );
};

export default ForgotPasswordPage;
