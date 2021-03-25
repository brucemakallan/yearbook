import React from 'react';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

import { signupValidation } from '../../components/UserPages/userValidation';
import Loader from '../../components/Loader';
import Feedback from '../../components/Feedback';
import MainHeading from '../../components/MainHeading';
import renderInputWrapper from '../../helpers/formHelpers';
import { SIGN_UP_MUTATION } from '../../graphql/user/mutations';
import DecoratedPage from '../../components/DecoratedPage';
import { setToken } from '../../helpers/jwt';

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
    setToken(data.signup.token);
    router.push('/create-profile');
  }

  const [signup, { error, loading, data }] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: handleOnCompleted,
  });

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
    <DecoratedPage>
      {loading && <Loader />}
      { error && (
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
          feedbackMessage='User successfully registered'
          severity='success'
          type='success'
        />
      )}
      <Grid container justify="center" alignContent="center">
        <Grid item xs={11} sm={6} md={4} lg={3}>
          <Collapse in={!loading}>
            <MainHeading text="Register" />
            <Typography component='p' align="center">
              Register for a trip down memory lane.
            </Typography>
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
              Already have an account? Login <Link href='/login'>here</Link>
            </Typography>
          </Collapse>
        </Grid>
      </Grid>
    </DecoratedPage>
  );
};

export default SignupForm;
