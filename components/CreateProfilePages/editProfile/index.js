import React from 'react';
import { useRouter } from 'next/router';
import get from 'lodash/get';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import upperCase from 'lodash/upperCase';

import EditProfileForm from './editProfileForm';
import useStyles from '../styles';
import Page from '../../../components/DashboardComponents/Page';
import { getStudentProfileFromCache } from '../../../helpers/cacheManagement';
import { GET_SINGLE_PROFILE_QUERY } from '../../../graphql/profile/queries';
import Loader from '../../../components/Loader';
import Feedback from '../../../components/Feedback';
import CourseForm from '../selectCourse/courseForm';

const EditProfile = () => {
  const [profile, setProfile] = React.useState();

  const classes = useStyles();
  const router = useRouter();
  const { id: profileId } = router.query;
  const client = useApolloClient();

  const getSingleProfileFromCache = getStudentProfileFromCache(client);

  const getSingleProfile = useQuery(GET_SINGLE_PROFILE_QUERY, {
    variables: {
      searchParams: {
        profileId,
      },
    },
  });

  React.useEffect(() => {
    if (get(getSingleProfileFromCache, 'singleProfile')) {
      const cachedProfile = get(getSingleProfileFromCache, 'singleProfile');
      setProfile(cachedProfile);
    } else {
      const profileFromServer = get(getSingleProfile, 'data.singleProfile');
      setProfile(profileFromServer);
    }
  }, [
    getSingleProfile, getSingleProfileFromCache,
  ]);

  const editCourseValues = (currentProfile) => ({
    university: {
      value: currentProfile.course.department.university.id,
      label: currentProfile.course.department.university.name,
    },
    department: {
      value: currentProfile.course.department.id,
      label: currentProfile.course.department.name,
    },
    course: {
      value: currentProfile.course.id,
      label: currentProfile.course.name,
    },
    year: {
      value: currentProfile.year,
      label: String(currentProfile.year),
    },
  });

  return (
    <>
      {getSingleProfile.loading && <Loader />}
      {getSingleProfile.error && (
        <Feedback
          open={!!getSingleProfile.error}
          feedbackMessage={getSingleProfile.error}
          severity='error'
          type='error'
        />
      )}
      {profile && (
        <Page
          title={upperCase(`${profile.user.firstName} ${profile.user.lastName}`)}
        >
          <Grid container spacing={2} justify="center">
            <Grid item xs={12} sm={12} md={7} lg={7}>
              <Paper className={classes.paper} elevation={0}>
                <Typography variant="h5" gutterBottom>Student Profile</Typography>
                <EditProfileForm singleProfile={profile}/>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={7}>
              <Paper className={classes.paper} elevation={0}>
                <Typography variant="h5" gutterBottom>Course</Typography>
                <CourseForm classes={classes} profile={profile} editCourseValues={editCourseValues(profile)}/>
              </Paper>
            </Grid>
          </Grid>
        </Page>
      )}
    </>
  );
};

export default EditProfile;
