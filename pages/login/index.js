import React from 'react';
import get from 'lodash/get';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

import { loginValidation } from '../../components/UserPages/userValidation';
import MainHeading from '../../components/MainHeading';
import DecoratedPage from '../../components/DecoratedPage';
import renderInputWrapper from '../../helpers/formHelpers';
import { LOGIN_MUTATION, O_AUTH_LOGIN_MUTATION } from '../../graphql/user/mutations';
import { GET_SINGLE_PROFILE_QUERY } from '../../graphql/profile/queries';
import CustomNextLink from '../../components/CustomNextLink';
import GoogleAuth from '../../components/GoogleAuth';
import QueryAlert from '../../components/QueryAlert/index';
import Separator from '../../components/Separator';
import {
  setToken, getToken, getDecodedToken,
} from '../../helpers/jwt';

const formInputFields = [
  {
    id: 'email',
    type: 'email',
    required: true,
  },
  {
    id: 'password',
    type: 'password',
    required: true,
  },
];

const initialFormValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const router = useRouter();

  const user = getDecodedToken(getToken());
  const userId = get(user, '_id');

  const [executeGetProfileQuery, getSingleProfile] = useLazyQuery(GET_SINGLE_PROFILE_QUERY, {
    variables: {
      searchParams: {
        userId,
      },
    },
  });

  const [login, loginResponse] = useMutation(LOGIN_MUTATION);

  const [oAuthLogin, oAuthLoginResponse] = useMutation(O_AUTH_LOGIN_MUTATION);

  React.useEffect(() => {
    if (userId && !getSingleProfile.loading && !getSingleProfile?.data?.singleProfile?.id) {
      executeGetProfileQuery();
    }

    if (getSingleProfile?.data?.singleProfile?.course?.id) {
      router.push('/dashboard');
    } else if (loginResponse?.data || oAuthLoginResponse?.data) {
      const loginToken = loginResponse?.data?.login?.token || oAuthLoginResponse?.data?.oAuthLogin?.token;
      setToken(loginToken);
      router.push('/create-profile');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    loginResponse.data,
    oAuthLoginResponse.data,
    getSingleProfile.data?.singleProfile,
    userId,
  ]);

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

  const handleSubmit = async (loginUser) => {
    try {
      await login({
        variables: {
          loginUser,
        },
      });
    } catch (err) {
      return err;
    }
  };

  const loading = getSingleProfile.loading || loginResponse.loading || oAuthLoginResponse.loading;
  const error = loginResponse.error || oAuthLoginResponse.error;
  const data = loginResponse.data || oAuthLoginResponse.data;

  return (
    <DecoratedPage
      hide={get(getSingleProfile, 'data.singleProfile.course.id')}
      pageTitle="Login"
      pageDescription="Already one of us? Login here"
      loading={getSingleProfile.loading} // hides the content
    >
      <QueryAlert
        loading={loading}
        error={error}
        data={data}
        successMessage="User successfully logged in"
      />
      <Grid container justify="center" alignContent="center">
        <Grid item xs={11} sm={6} md={4} lg={3}>
          <Collapse in={!loginResponse.loading || !oAuthLoginResponse.loading}>
            <MainHeading text="Login" />
            <GoogleAuth responseGoogle={handleGoogleAuthResponse} />
            <Separator />
            <Formik
              initialValues={initialFormValues}
              validationSchema={loginValidation}
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
                  LOGIN
                </Button>
              </Form>
            </Formik>
            <Typography variant="body1" align="center" gutterBottom>
              <CustomNextLink href='/forgot-password'>Forgot Password</CustomNextLink>
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              Don't have an account? Register <CustomNextLink href='/register'>here</CustomNextLink>
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

export default LoginForm;
