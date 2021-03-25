import * as Yup from 'yup';

const universityValidation = Yup.object({
  name: Yup.string().required('Name is required'),
});

export default universityValidation;
