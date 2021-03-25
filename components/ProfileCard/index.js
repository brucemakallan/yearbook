import React from 'react';
import get from 'lodash/get';
import { useLazyQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import useStyles from './styles';
import PersonalSection from './cardSections/personalSection';
import GallerySection from './cardSections/gallerySection';
import CourseSection from './cardSections/courseSection';
import SectionTitle from './cardSections/sectionTitle';
import { SINGLE_PROFILE_GALLERY_QUERY } from '../../graphql/profileGallery/queries';

const ProfileCard = ({ studentProfile, currentUser }) => {
  const classes = useStyles();
  const history = useHistory();

  const [profile, setProfile] = React.useState();
  const [studentPhotos, setStudentPhotos] = React.useState([]);

  const [fireStudentPhotosQuery, getStudentPhotos] = useLazyQuery(SINGLE_PROFILE_GALLERY_QUERY);

  React.useEffect(() => {
    setProfile(studentProfile);

    // only get gallery photos when a profile is available
    const profileId = get(studentProfile, 'data.singleProfile.id');
    if (profileId) {
      fireStudentPhotosQuery({
        fetchPolicy: 'network-only',
        variables: {
          profileId,
        },
      });
    }
  }, [fireStudentPhotosQuery, profile, studentProfile]);

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

  const profileBelongsToCurrentUser = get(profile, 'data.singleProfile.user.id') === get(currentUser, '_id');

  const singleProfile = get(profile, 'data.singleProfile');

  const gotoEditProfile = () => {
    history.push(`/dashboard/profile/${singleProfile.id}/edit`);
  };

  const viewGallery = () => {
    history.push(`/dashboard/profile/${singleProfile.id}/gallery`);
  };

  return (
    <>
      {singleProfile && (
        <Card className={classes.card}>
          <div className={classes.cardContents}>
            <PersonalSection classes={classes} singleProfile={singleProfile} />
            <CourseSection classes={classes} singleProfile={singleProfile} />
            <SectionTitle classes={classes} title="Photos" />
            <GallerySection
              classes={classes}
              showPreview={true}
              images={studentPhotos}
              goToGallery={viewGallery}
            />
          </div>
          <CardActions>
            <Button size="small" color="secondary" onClick={viewGallery}>View Gallery</Button>
            {profileBelongsToCurrentUser && (
              <Button size="small" color="secondary" onClick={gotoEditProfile}>Edit Profile</Button>
            )}
            {/* {isAdmin() && <Button size="small" color="secondary">Disable Account</Button>} */}
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default ProfileCard;
