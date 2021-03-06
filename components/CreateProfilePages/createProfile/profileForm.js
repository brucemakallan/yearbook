import React, { useState } from 'react';
import get from 'lodash/get';
import { Formik, Form } from 'formik';
import { useMutation } from '@apollo/react-hooks';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import profileValidation, { cleanProfile } from './validation';
import Loader from '../../Loader';
import Feedback from '../../Feedback';
import renderInputWrapper from '../../../helpers/formHelpers';
import { CREATE_PROFILE_MUTATION } from '../../../graphql/profile/mutations';
import UploadFile from '../../UploadFile';
import PhotoDisplay from '../../PhotoDisplay';
import { uploadEntities } from '../../../helpers/enums';
import { getDecodedToken, getToken } from '../../../helpers/jwt';
import EmailLink from '../../EmailLink';
import {
  initialValues, formInputFields, FACEBOOK_PREFIX, PHONE_PREFIX,
} from './profileFormValues';

const ProfileForm = ({ classes, setProfile }) => {
  const [photoArray, setPhotoArray] = useState([]);
  const [invalidImage, setInvalidImage] = useState(false);

  const [createProfile, { error, loading, data }] = useMutation(CREATE_PROFILE_MUTATION);

  React.useEffect(() => {
    if (get(data, 'createProfile.id')) { // after creating a profile
      setProfile(data.createProfile);
    }
  }, [data, setProfile]);

  const user = getDecodedToken(getToken());
  const userId = get(user, '_id');
  const firstName = get(user, 'firstName');

  const handleSubmit = async (profile) => {
    try {
      const displayPicture = get(photoArray, '[0]');
      if (!displayPicture && invalidImage) {
        setInvalidImage(false);
      }
      if (!displayPicture) {
        setInvalidImage(true);
      } else {
        const facebook = profile.facebook
          ? `${FACEBOOK_PREFIX}${profile.facebook}`
          : '';
        const phoneNumber = profile.phoneNumber
          ? `${PHONE_PREFIX}${String(profile.phoneNumber).replace('+', '')}`
          : '';

        const clean = cleanProfile({
          ...profile,
          phoneNumber,
          facebook,
          displayPicture: displayPicture.url,
        });
        await createProfile({
          variables: {
            profile: clean,
          },
        });
      }
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
      {(invalidImage && !data) && (
        <Feedback
          open={invalidImage && !data}
          feedbackMessage='Please upload a profile photo'
          severity='error'
          type='warning'
        />
      )}
      {firstName && (
        <>
          <Typography variant="body2" color="primary">
            {`Hey ${firstName} ????`}
          </Typography>
          <Typography variant="body2" color="primary">
            {'Please create a Profile so you can find your friends from the same university / school.'}
          </Typography>
        </>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={profileValidation}
        onSubmit={handleSubmit}
      >
        <Form className={classes.form}>
          {formInputFields.map((field) => renderInputWrapper(field))}
          <UploadFile
            uploadEntity={uploadEntities.PROFILE}
            text="Upload a profile picture"
            tags={[userId]}
            photoArray={photoArray}
            setPhotoArray={setPhotoArray}
            crop={true}
          />
          {photoArray && <PhotoDisplay photos={photoArray} />}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Button
                variant="contained"
                type='submit'
                color="primary"
              >
                Continue
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="body2" component="span">
                {'Need help? Email us at: '}
              </Typography>
              <EmailLink email="support@madeyear.com" />
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  );
};

export default ProfileForm;
