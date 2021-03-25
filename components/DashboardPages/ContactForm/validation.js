import * as Yup from 'yup';

export const contactFormValidation = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  subject: Yup.string()
    .min(2, 'Subject should be at least 2 characters long')
    .required('Subject is required'),
  message: Yup.string()
    .min(8, 'Message should be at least 8 characters long')
    .required('Message is required'),
});

export default contactFormValidation;
