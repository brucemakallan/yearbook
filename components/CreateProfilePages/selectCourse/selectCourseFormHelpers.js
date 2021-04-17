import get from 'lodash/get';
import { institutionTypes } from '../../../helpers/enums';
import { setCoursesInDepartment, setDepartmentsInUniversity } from '../../../helpers/formHelpers';

export const changeUniversity = ({
  allDepartments, allCourses, autocompleteValue, universities, setDepartments, setCourses, setValues,
}) => {
  const universityId = get(autocompleteValue, 'value', '');
  let classification = autocompleteValue?.entity?.classification;

  if (classification === undefined) { // can be zero
    const selectedUniversity = universities.find(({ id }) => id === universityId);
    classification = selectedUniversity?.classification;
  }

  const institutionType = institutionTypes.find((type) => type.value === classification);
  const selectedDepartments = setDepartmentsInUniversity(allDepartments, universityId, setDepartments);
  setCoursesInDepartment(allCourses, get(selectedDepartments, '[0].id'), setCourses);
  setValues({
    institutionType: institutionType || institutionTypes[0],
    university: autocompleteValue,
  });
};

export const changeDepartment = ({
  allCourses, autocompleteValue, setCourses, setValues, values,
}) => {
  const value = get(autocompleteValue, 'value', '');
  setCoursesInDepartment(allCourses, value, setCourses);
  setValues({
    ...values,
    university: values.university,
    department: autocompleteValue,
  });
};

export const changeCourse = ({ autocompleteValue, setValues, values }) => {
  setValues({
    ...values,
    course: autocompleteValue,
  });
};

export const changeYear = ({ autocompleteValue, setValues, values }) => {
  setValues({
    ...values,
    year: autocompleteValue,
  });
};

export const changeInstitution = ({ autocompleteValue, setValues, values }) => {
  setValues({
    ...values,
    institutionType: autocompleteValue,
  });
};
