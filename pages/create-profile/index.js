import React from 'react';
import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import useStyles from '../../components/CreateProfilePages/styles';
import DecoratedPage from '../../components/DecoratedPage';
import CustomStepper from '../../components/CustomStepper';
import ProfileForm from '../../components/CreateProfilePages/createProfile/profileForm';
import CourseForm from '../../components/CreateProfilePages/selectCourse/courseForm';
import { GET_SINGLE_PROFILE_QUERY } from '../../graphql/profile/queries';
import Loader from '../../components/Loader';
import Feedback from '../../components/Feedback';
import {
  getToken, getDecodedToken, clearToken, isAdmin,
} from '../../helpers/jwt';

const steps = [
  'Create Student Profile',
  'Select Course',
];

const ProfileAndCourseStepper = () => {
  const classes = useStyles();
  const router = useRouter();

  const [activeStep, setActiveStep] = React.useState(0);
  const [profile, setProfile] = React.useState();

  const user = getDecodedToken(getToken());

  const getSingleProfile = useQuery(GET_SINGLE_PROFILE_QUERY, {
    variables: {
      searchParams: {
        userId: get(user, '_id'),
      },
    },
  });

  React.useEffect(() => {
    const courseExists = get(getSingleProfile, 'data.singleProfile.course.id');
    const profileExists = get(getSingleProfile, 'data.singleProfile.id');

    if (courseExists || isAdmin()) { // has profile and course
      router.push('/dashboard');
    } else if (profileExists && !courseExists) { // has profile but not course
      setProfile(get(getSingleProfile, 'data.singleProfile'));
    } else if (String(getSingleProfile.error).includes('please log in')) {
      clearToken();
    }

    if (get(profile, 'id')) { // only go to next step if you have a profile
      setActiveStep(1);
    }
  }, [getSingleProfile, profile, user]);

  if (getSingleProfile.loading) return <Loader />;

  return (
    <DecoratedPage hide={get(getSingleProfile, 'data.singleProfile.course.id')}>
      {getSingleProfile.error && (
        <Feedback
          open={!!getSingleProfile.error}
          feedbackMessage={getSingleProfile.error}
          severity='error'
          type='error'
        />
      )}
      <Grid container justify="center">
        <Grid item xs={11} sm={11} md={6} lg={4}>
          <Paper className={classes.paper} elevation={7}>
            <CustomStepper steps={steps} activeStep={activeStep} />
            {activeStep === 0 && <ProfileForm classes={classes} setProfile={setProfile} />}
            {activeStep === 1 && get(profile, 'id') && <CourseForm classes={classes} profile={profile} />}
          </Paper>
        </Grid>
      </Grid>
    </DecoratedPage>
  );
};

export default ProfileAndCourseStepper;
