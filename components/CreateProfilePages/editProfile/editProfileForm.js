import React, { useState } from 'react';
import { useRouter } from 'next/router';
import get from 'lodash/get';
import { Formik, Form } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import profileValidation, { cleanProfile } from '../createProfile/validation';
import Loader from '../../Loader';
import Feedback from '../../Feedback';
import renderInputWrapper from '../../../helpers/formHelpers';
import { UPDATE_PROFILE_MUTATION } from '../../../graphql/profile/mutations';
import {
  formInputFields, FACEBOOK_PREFIX, PHONE_PREFIX,
} from '../createProfile/profileFormValues';
import { editInitialValues } from './editProfileFormValues';
import useStyles from '../styles';
import EditAvatar from '../../EditAvatar';
import UploadFile from '../../UploadFile';
import DeleteProfile from '../../DeleteProfile';

const EditProfileForm = ({ singleProfile }) => {
  const classes = useStyles();
  const router = useRouter();

  const [photoArray, setPhotoArray] = useState([]);
  const userId = get(singleProfile, 'user.id');

  const handleOnCompleted = (_data) => {
    router.push('/dashboard/profile');
  };

  const [updateProfile, { error, loading, data }] = useMutation(UPDATE_PROFILE_MUTATION, {
    onCompleted: handleOnCompleted,
  });

  const handleSubmit = async (profile) => {
    try {
      const displayPicture = get(photoArray, '[0]', profile.displayPicture);

      const facebook = profile.facebook
        ? `${FACEBOOK_PREFIX}${profile.facebook}`
        : '';

      const phoneNumber = profile.phoneNumber
        ? `${PHONE_PREFIX}${String(profile.phoneNumber).replace('+', '')}`
        : '';

      const clean = cleanProfile({
        ...profile,
        displayPicture: displayPicture.url || displayPicture,
        phoneNumber,
        facebook,
      });

      await updateProfile({
        variables: {
          profile: clean,
        },
      });
    } catch (err) {
      return err;
    }
  };

  return (
    <>
      {loading && <Loader />}
      {error && (
        <Feedback
          open={!!error}
          feedbackMessage={error}
          severity='error'
          type='error'
        />
      )}
      <Formik
        initialValues={editInitialValues(singleProfile)}
        validationSchema={profileValidation}
        onSubmit={handleSubmit}
      >
        <Form className={classes.form}>
          <EditAvatar
            photo={get(photoArray, '[0]', {
              url: singleProfile.displayPicture,
            })}
          >
            <UploadFile
              tags={[userId]}
              photoArray={photoArray}
              setPhotoArray={setPhotoArray}
              crop={true}
            >
              <IconButton
                color="secondary"
                aria-label="edit D.P"
                component="span"
                size="small"
              >
                <EditIcon />
              </IconButton>
            </UploadFile>
          </EditAvatar>
          {formInputFields.map((field) => renderInputWrapper(field))}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Button
                variant="contained"
                type="submit"
                color="primary"
              >
                Save Profile
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <DeleteProfile />
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  );
};

export default EditProfileForm;
