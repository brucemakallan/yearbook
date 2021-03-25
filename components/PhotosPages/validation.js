import pick from 'lodash/pick';

const cleanProfileGallery = (profileGallery) => {
  const allowedValues = [
    'url',
  ];

  return profileGallery.map((photo) => pick(photo, allowedValues));
};

export default cleanProfileGallery;
