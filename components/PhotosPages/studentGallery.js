import React, { useState } from 'react';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';

import Loader from '../Loader';
import Feedback from '../Feedback';
import useStyles from './styles';
import { UPSERT_PROFILE_GALLERIES_MUTATION } from '../../graphql/profileGallery/mutations';
import UploadFile from '../UploadFile';
import { uploadEntities } from '../../helpers/enums';
import { SINGLE_PROFILE_GALLERY_QUERY } from '../../graphql/profileGallery/queries';
import GallerySection from '../ProfileCard/cardSections/gallerySection';
import ContextAppBar from '../ContextAppBar';
import cleanProfileGallery from './validation';
import CustomAlert from '../CustomAlert';

const StudentGallery = ({ singleProfile, currentUser }) => {
  const classes = useStyles();

  const profileId = get(singleProfile, 'id');
  const userId = get(singleProfile, 'user.id');

  const [studentPhotos, setStudentPhotos] = useState([]);

  const [upsertProfilePhotos, { error, loading, data }] = useMutation(UPSERT_PROFILE_GALLERIES_MUTATION);

  const getStudentPhotos = useQuery(SINGLE_PROFILE_GALLERY_QUERY, {
    variables: {
      profileId,
    },
  });

  React.useEffect(() => {
    const allStudentPhotos = [];

    if (get(getStudentPhotos, 'data.singleProfileGallery.id')) {
      get(getStudentPhotos, 'data.singleProfileGallery.urls')
        .forEach((photo) => allStudentPhotos.push({
          url: photo.url,
          checked: false,
        }));
    }

    setStudentPhotos(allStudentPhotos);
  }, [getStudentPhotos]);

  const fileUploadHandler = (photos) => {
    upsertProfilePhotos({
      variables: {
        urls: cleanProfileGallery(photos),
      },
    });
  };

  const handleChecked = (tile) => ({ target }) => {
    const studentPhotosClone = cloneDeep(studentPhotos);
    const checkedPhotos = studentPhotosClone.map((student) => {
      const st = student;
      if (student.url === tile.img) {
        st.checked = target.checked;
      }
      return st;
    });

    setStudentPhotos(checkedPhotos);
  };

  const handleDeleteChecked = () => {
    const photos = studentPhotos.filter(({ checked }) => checked === false);
    upsertProfilePhotos({
      variables: {
        urls: cleanProfileGallery(photos),
      },
    });
  };

  const selectedItems = studentPhotos.filter(({ checked }) => checked);
  const profileBelongsToOwner = singleProfile.user.id === get(currentUser, '_id');

  return (
    <>
      {(loading || getStudentPhotos.loading) && <Loader />}
      {(error || getStudentPhotos.error) && (
        <Feedback
          open={!!getStudentPhotos.error || !!error}
          feedbackMessage={error || getStudentPhotos.error}
          severity='error'
          type='error'
        />
      )}
      {data && (
        <Feedback
          open={!!data}
          feedbackMessage='Photos updated successfully'
          severity='success'
          type='success'
        />
      )}
      <Grid container justify="center" className={classes.upload}>
        <Grid item md={2} lg={2}>
          {profileBelongsToOwner && (
            <UploadFile
              uploadEntity={uploadEntities.GALLERY}
              text='Upload photos'
              tags={[userId]}
              photoArray={studentPhotos}
              setPhotoArray={setStudentPhotos}
              crop={false}
              handleSave={fileUploadHandler}
            />
          )}
        </Grid>
        {selectedItems.length > 0 && (
          <Grid item xs={12} sm={12} md={10} lg={10}>
            <ContextAppBar
              selectedItems={selectedItems}
              handleDeleteChecked={handleDeleteChecked}
            />
          </Grid>
        )}
      </Grid>
      {studentPhotos && studentPhotos.length > 0
        && profileBelongsToOwner && (
        <Grid container justify='center'>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CustomAlert
              severity="info"
              message={'TIP: You can select multiple photos to delete from your gallery'}
            />
          </Grid>
        </Grid>
      )}
      <Grid container justify='center'>
        <GallerySection
          classes={classes}
          images={studentPhotos}
          isGallery={true}
          galleryOwner={profileBelongsToOwner}
          handleChange={handleChecked}
        />
      </Grid>
    </>
  );
};

export default StudentGallery;
