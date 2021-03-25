import * as Yup from 'yup';

const departmentValidation = Yup.object({
  name: Yup.string().required('Name is required'),
});

export default departmentValidation;
