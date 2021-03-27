import * as Yup from 'yup';

const courseValidation = Yup.object({
  name: Yup.string().required('Name is required'),
});

export default courseValidation;
