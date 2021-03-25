export const FACEBOOK_PREFIX = 'https://facebook.com/';
export const PHONE_PREFIX = '+';

export const formInputFields = [
  {
    id: 'registrationNumber',
  },
  {
    id: 'bio',
    label: 'What would you like to be remembered for?',
    multilineRows: 2,
    maxCharacters: 230,
  },
  {
    id: 'phoneNumber',
    label: 'Phone Number (Optional)',
    startAdornment: PHONE_PREFIX,
    type: 'number',
  },
  {
    id: 'facebook',
    label: 'Facebook Username (Optional)',
    startAdornment: FACEBOOK_PREFIX,
    maxCharacters: 50,
  },
];

export const initialValues = {
  displayPicture: '',
  registrationNumber: '',
  phoneNumber: '',
  bio: '',
  facebook: '',
};
