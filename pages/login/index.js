import React from 'react';
import get from 'lodash/get';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

import { loginValidation } from '../../components/UserPages/userValidation';
import Loader from '../../components/Loader';
import Feedback from '../../components/Feedback';
import MainHeading from '../../components/MainHeading';
import DecoratedPage from '../../components/DecoratedPage';
import renderInputWrapper from '../../helpers/formHelpers';
import { LOGIN_MUTATION } from '../../graphql/user/mutations';
import { GET_SINGLE_PROFILE_QUERY } from '../../graphql/profile/queries';
import CustomNextLink from '../../components/CustomNextLink';
import {
  setToken, getToken, getDecodedToken,
} from '../../helpers/jwt';

const formInputFields = [
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
  email: '',
  password: '',
};

const LoginForm = () => {
  const router = useRouter();

  const user = getDecodedToken(getToken());

  const getSingleProfile = useQuery(GET_SINGLE_PROFILE_QUERY, {
    variables: {
      searchParams: {
        userId: get(user, '_id'),
      },
    },
  });

  const [login, { error, loading, data }] = useMutation(LOGIN_MUTATION);

  React.useEffect(() => {
    if (get(getSingleProfile, 'data.singleProfile.course.id')) {
      router.push('/dashboard');
    } else if (data) {
      setToken(data.login.token);
      router.push('/create-profile');
    }
  }, [data, getSingleProfile, router]);

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

  if (getSingleProfile.loading) return <Loader />;

  return (
    <DecoratedPage
      hide={get(getSingleProfile, 'data.singleProfile.course.id')}
      pageTitle="Login"
    >
      {loading && <Loader />}
      {error && (
        <Feedback
          open={!!error}
          feedbackMessage={error}
          severity='error'
          type='error'
        />
      )}
      {data && (
        <Feedback
          open={!!data}
          feedbackMessage='User successfully logged in'
          severity='success'
          type='success'
        />
      )}
      <Grid container justify="center" alignContent="center">
        <Grid item xs={11} sm={6} md={4} lg={3}>
          <Collapse in={!loading}>
            <MainHeading text="Login" />
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
