import * as Yup from 'yup';
import pick from 'lodash/pick';

const facebookUsernameRegex = {
  regex: /[A-Z\d.]{4,50}/i,
  // eslint-disable-next-line max-len
  message: 'Usernames can only contain alphanumeric characters and periods and must be at least 4 characters long e.g. "zuck"',
};

const phoneRegex = {
  regex: /[0-9]{10,}/,
  message: 'Phone Number must only contain digits and must be at least 10 characters long e.g. 256772009988',
};

const requiredField = Yup.string().required('This field is required');

const profileValidation = Yup.object({
  bio: requiredField,
  phoneNumber: Yup.string().matches(phoneRegex.regex, phoneRegex.message),
  facebook: Yup.string().matches(facebookUsernameRegex.regex, facebookUsernameRegex.message),
});

export const cleanProfile = (profile) => {
  const allowedValues = [
    'displayPicture',
    'registrationNumber',
    'phoneNumber',
    'bio',
    'facebook',
    'courseId',
    'universityId',
    'year',
  ];

  return pick(profile, allowedValues);
};

export default profileValidation;
