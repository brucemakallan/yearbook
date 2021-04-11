import React from 'react';
import get from 'lodash/get';
import upperCase from 'lodash/upperCase';
import { Formik, Form } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import courseValidation from './validation';
import Loader from '../../Loader';
import Feedback from '../../Feedback';
import renderInputWrapper from '../../../helpers/formHelpers';
import { CREATE_COURSE_MUTATION, UPDATE_COURSE_MUTATION } from '../../../graphql/course/mutations';
import { GET_ALL_COURSES_IN_DEPARTMENT_QUERY, GET_ALL_COURSES_QUERY } from '../../../graphql/course/queries';
import useStyles from './styles';

const formInputFields = [
  {
    id: 'name',
    placeholder: 'Course Name',
  },
];

const initialValues = {
  name: '',
};

const refetchQueries = [{
  query: GET_ALL_COURSES_QUERY,
}];

const CourseForm = ({
  course,
  currentDepartment,
  fullWidth,
  handleOnCompleted,
}) => {
  const classes = useStyles();

  const router = useRouter();
  const { departmentId } = router.query;

  const [values, setValues] = React.useState(initialValues);

  const [createCourse, createCourseResponse] = useMutation(CREATE_COURSE_MUTATION, {
    onCompleted: handleOnCompleted,
    refetchQueries,
  });
  const [updateCourse, updateCourseResponse] = useMutation(UPDATE_COURSE_MUTATION, {
    onCompleted: handleOnCompleted,
    refetchQueries,
  });

  React.useEffect(() => {
    if (course) {
      setValues(course);
    }
  }, [course]);

  const handleSubmit = async ({ name }) => {
    try {
      const createCourseArgs = {
        variables: {
          course: {
            name,
            departmentId: departmentId || get(currentDepartment, 'id'),
          },
        },
        refetchQueries: [{
          query: GET_ALL_COURSES_IN_DEPARTMENT_QUERY,
          variables: {
            departmentId: departmentId || currentDepartment?.id,
          },
        }],
      };
      const updateCourseArgs = {
        variables: {
          courseUpdates: {
            courseId: get(course, 'id'),
            newName: name,
          },
        },
      };

      if (course) {
        await updateCourse(updateCourseArgs);
      } else {
        await createCourse(createCourseArgs);
      }
    } catch (err) {
      return err;
    }
  };

  return (
    <>
      {createCourseResponse.loading && <Loader />}
      {(createCourseResponse.error || updateCourseResponse.error) && (
        <Feedback
          open={!!createCourseResponse.error || !!updateCourseResponse.error}
          feedbackMessage={createCourseResponse.error || updateCourseResponse.error}
          severity='error'
          type='error'
        />
      )}
      {(createCourseResponse.data || updateCourseResponse.data) && (
        <Feedback
          open={!!createCourseResponse.data || !!updateCourseResponse.data}
          feedbackMessage={createCourseResponse.data ? 'Successfully created' : 'Successfully updated'}
          severity='success'
          type='success'
        />
      )}
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={12} md={fullWidth ? 12 : 6} lg={fullWidth ? 12 : 6}>
          <Formik
            enableReinitialize
            initialValues={values}
            validationSchema={courseValidation}
            onSubmit={handleSubmit}
          >
            <Paper className={classes.paper} elevation={0}>
              <Typography variant="h6" gutterBottom>
                {`${upperCase(currentDepartment.name)}: COURSE`}
              </Typography>

              <Form className={classes.form}>
                {formInputFields.map((field) => renderInputWrapper(field))}
                <Grid container spacing={2}>
                  <Button variant="contained" type='submit' color="primary">
                    {`${course ? 'UPDATE' : 'CREATE'} COURSE`}
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

export default CourseForm;
