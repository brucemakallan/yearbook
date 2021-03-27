import * as Yup from 'yup';

export const loginValidation = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password should be at least 8 characters long')
    .required('Password is required'),
});

export const signupValidation = Yup.object({
  firstName: Yup.string()
    .min(2, 'Must be 2 characters or more')
    .required('First Name is required'),
  lastName: Yup.string()
    .min(2, 'Must be 2 characters or more')
    .required('Last Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password should be at least 8 characters long')
    .required('Password is required'),
});
