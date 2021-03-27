import { FACEBOOK_PREFIX, PHONE_PREFIX } from '../createProfile/profileFormValues';

export const editInitialValues = (profile) => {
  const facebook = profile.facebook
    ? String(profile.facebook).replace(FACEBOOK_PREFIX, '')
    : '';

  const phoneNumber = profile.phoneNumber
    ? String(profile.phoneNumber).replace(PHONE_PREFIX, '')
    : '';

  return ({
    ...profile,
    phoneNumber,
    facebook,
  });
};

export default editInitialValues;
