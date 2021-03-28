import React from 'react';
import get from 'lodash/get';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Loader from '../../../components/Loader';
import Feedback from '../../../components/Feedback';
import MainHeading from '../../../components/MainHeading';
import DecoratedPage from '../../../components/DecoratedPage';
import { RESET_PASSWORD_MUTATION } from '../../../graphql/user/mutations';
import { GET_SINGLE_USER_QUERY } from '../../../graphql/user/queries';
import useStyles from '../../../components/ResetPasswordPages/styles';
import { getDecodedToken } from '../../../helpers/jwt';
import ResetPasswordLayout from '../../../components/ResetPasswordPages/resetPasswordLayout';
import CustomNextLink from '../../../components/CustomNextLink';

const formInputFields = [
  {
    id: 'newPassword',
    type: 'password',
  },
  {
    id: 'confirmPassword',
    type: 'password',
  },
];

const initialFormValues = {
  newPassword: '',
  confirmPassword: '',
};

const ResetPasswordPage = () => {
  const [userPassword, setUserPassword] = React.useState(null);
  const [validationError, setValidationError] = React.useState(null);
  const router = useRouter();
  const classes = useStyles();
  const { id, token } = router.query;

  const [resetPassword, { error, loading, data }] = useMutation(RESET_PASSWORD_MUTATION);
  const getSingleUser = useQuery(GET_SINGLE_USER_QUERY, {
    variables: {
      searchParams: {
        id,
      },
    },
  });

  React.useEffect(() => {
    if (get(getSingleUser, 'data.singleUser')) {
      const singleUser = get(getSingleUser, 'data.singleUser');
      const { password } = singleUser;
      setUserPassword(password);
    }
  }, [getSingleUser]);

  const user = getDecodedToken(token);

  const handleSubmit = async (passwords) => {
    try {
      setValidationError(null);
      const { newPassword, confirmPassword } = passwords;
      if (user.password !== userPassword) {
        setValidationError('Token is expired');
      }
      if (newPassword !== confirmPassword) {
        setValidationError('Passwords do not match');
      }
      if ((user.password === userPassword)
        && (newPassword === confirmPassword)) {
        user.password = passwords.newPassword;
        const { password } = user;
        await resetPassword({
          variables: {
            resetPasswordParams: {
              id,
              password,
              token,
            },
          },
        });
      }
    } catch (err) {
      return err;
    }
  };

  const handleCancel = () => {
    router.push('/login');
  };

  if (data && data.resetPassword) {
    return (
      <DecoratedPage pageTitle="Reset Password">
        <Feedback
          open={!!data}
          feedbackMessage='Password changed successfully'
          severity='success'
          type='success'
        />
        <Grid container justify="center" alignContent="center">
          <Grid item xs={11} sm={6} md={4} lg={3}>
            <MainHeading text="Password updated successfully" />
            <Typography component='p' align="center">
              Continue to the login page <CustomNextLink href='/login'>here.</CustomNextLink>.
            </Typography>
          </Grid>
        </Grid>
      </DecoratedPage>
    );
  }
  return (
    <DecoratedPage pageTitle="Reset Password">
      {loading && <Loader />}
      {(validationError || error) && (
        <Feedback
          open={!!validationError || !!error}
          feedbackMessage={validationError || error }
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
        heading = {'Change Password'}
        buttonText = {'SAVE'}
      />
    </DecoratedPage>
  );
};

export default ResetPasswordPage;
