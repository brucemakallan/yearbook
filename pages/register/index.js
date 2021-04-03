import React from 'react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

import { signupValidation } from '../../components/UserPages/userValidation';
import MainHeading from '../../components/MainHeading';
import renderInputWrapper from '../../helpers/formHelpers';
import { O_AUTH_LOGIN_MUTATION, SIGN_UP_MUTATION } from '../../graphql/user/mutations';
import DecoratedPage from '../../components/DecoratedPage';
import { setToken } from '../../helpers/jwt';
import CustomNextLink from '../../components/CustomNextLink';
import QueryAlert from '../../components/QueryAlert';
import GoogleAuth from '../../components/GoogleAuth';
import Separator from '../../components/Separator';

const formInputFields = [
  {
    id: 'firstName',
  },
  {
    id: 'lastName',
  },
  {
    id: 'email',
    type: 'email',
  },
  {
    id: 'password',
    type: 'password',
  },
];

const initialFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const SignupForm = () => {
  const router = useRouter();

  const handleOnCompleted = (data) => {
    const token = data?.signup?.token || data?.oAuthLogin?.token;
    setToken(token);
    router.push('/create-profile');
  };

  const [signup, signupResponse] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: handleOnCompleted,
  });

  const [oAuthLogin, oAuthLoginResponse] = useMutation(O_AUTH_LOGIN_MUTATION, {
    onCompleted: handleOnCompleted,
  });

  const handleGoogleAuthResponse = async (response) => {
    try {
      if (response.profileObj) {
        const { email, givenName, familyName } = response.profileObj;

        await oAuthLogin({
          variables: {
            loginUser: {
              email,
              firstName: givenName,
              lastName: familyName,
            },
          },
        });
      }
    } catch (err) {
      return err;
    }
  };

  const handleSubmit = async (signupUser) => {
    try {
      await signup({
        variables: {
          signupUser,
        },
      });
    } catch (err) {
      return err;
    }
  };

  return (
    <DecoratedPage
      pageTitle="Register"
      pageDescription="Don't have an account? Register here"
    >
      <QueryAlert
        loading={signupResponse.loading || oAuthLoginResponse.loading}
        error={signupResponse.error || oAuthLoginResponse.error}
        data={signupResponse.data || oAuthLoginResponse.data}
        successMessage="User successfully registered"
      />
      <Grid container justify="center" alignContent="center">
        <Grid item xs={11} sm={6} md={4} lg={3}>
          <Collapse in={!signupResponse.loading || !oAuthLoginResponse.loading}>
            <MainHeading text="Register" />
            <GoogleAuth
              buttonText="Register with Google"
              responseGoogle={handleGoogleAuthResponse}
            />
            <Separator />
            <Formik
              initialValues={initialFormValues}
              validationSchema={ signupValidation }
              onSubmit={ handleSubmit }
            >
              <Form>
                {formInputFields.map((field) => renderInputWrapper(field))}
                <Button
                  variant="contained"
                  type='submit'
                  color="primary"
                  fullWidth
                >
                  SIGN UP
                </Button>
              </Form>
            </Formik>
            <Typography variant="body1" align="center" gutterBottom>
              Already have an account? Login <CustomNextLink href='/login'>here</CustomNextLink>
            </Typography>
          </Collapse>
        </Grid>
      </Grid>
    </DecoratedPage>
  );
};

// SSR for SEO
export async function getServerSideProps() {
  return {
    props: {
    },
  };
}

export default SignupForm;
