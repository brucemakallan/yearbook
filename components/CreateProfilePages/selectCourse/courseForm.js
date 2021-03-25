// This Form is used to select a university department and course for the current user
// NOT to be confused with the one used to create a Course
import React, { useState } from 'react';
import get from 'lodash/get';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import { UPDATE_PROFILE_MUTATION } from '../../../graphql/profile/mutations';
import { cleanProfile } from '../createProfile/validation';
import CourseFormLayout from './courseFormLayout';
import { initialValues } from './courseFormValues';
import { GET_ALL_UNIVERSITIES_QUERY } from '../../../graphql/university/queries';
import { GET_ALL_DEPARTMENTS_QUERY } from '../../../graphql/department/queries';
import { GET_ALL_COURSES_QUERY } from '../../../graphql/course/queries';
import {
  setDepartmentsInUniversity,
  setCoursesInDepartment,
  setCourseValuesFromURL,
} from '../../../helpers/formHelpers';

const CourseForm = ({ classes, profile, editCourseValues }) => {
  const router = useRouter();

  const [universities, setUniversities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [values, setValues] = useState(editCourseValues || initialValues);
  const [validationError, setValidationError] = useState();

  const getAllUniversities = useQuery(GET_ALL_UNIVERSITIES_QUERY);
  const getAllDepartments = useQuery(GET_ALL_DEPARTMENTS_QUERY);
  const getAllCourses = useQuery(GET_ALL_COURSES_QUERY);

  const [updateProfile, { error, loading, data }] = useMutation(UPDATE_PROFILE_MUTATION);

  // Edit course
  React.useEffect(() => {
    const currentUniversity = get(editCourseValues, 'university.value');
    const currentDepartment = get(editCourseValues, 'department.value');

    const allDepartments = get(getAllDepartments, 'data.allDepartments');
    const allCourses = get(getAllCourses, 'data.allCourses');

    if (!!currentUniversity && !!allDepartments && !!allCourses) {
      setDepartmentsInUniversity(allDepartments, currentUniversity, setDepartments);
      setCoursesInDepartment(allCourses, currentDepartment, setCourses);
    }
    if (editCourseValues && data) {
      router.push('/dashboard/profile');
    }
  }, [data, editCourseValues, getAllCourses, getAllDepartments, location, universities]);

  React.useEffect(() => {
    const courseExists = get(profile, 'course.id') || get(data, 'updateProfile.course.id');

    if (courseExists && !editCourseValues) {
      router.push('/dashboard');
    } else if (getAllUniversities.data) {
      setUniversities(getAllUniversities.data.allUniversities);
    }
  }, [data, editCourseValues, getAllUniversities, profile]);

  const changeUniversity = (allDepartments, allCourses, autocompleteValue) => {
    const value = get(autocompleteValue, 'value', '');
    const selectedDepartments = setDepartmentsInUniversity(allDepartments, value, setDepartments);
    setCoursesInDepartment(allCourses, get(selectedDepartments, '[0].id'), setCourses);
    setValues({
      university: autocompleteValue,
    });
  };

  const changeDepartment = (allCourses, autocompleteValue) => {
    const value = get(autocompleteValue, 'value', '');
    setCoursesInDepartment(allCourses, value, setCourses);
    setValues({
      university: values.university,
      department: autocompleteValue,
    });
  };

  const changeCourse = (autocompleteValue) => {
    setValues({
      ...values,
      course: autocompleteValue,
    });
  };

  const changeYear = (autocompleteValue) => {
    setValues({
      ...values,
      year: autocompleteValue,
    });
  };

  // Load from URL
  React.useEffect(() => {
    const allDepartments = get(getAllDepartments, 'data.allDepartments');
    const allCourses = get(getAllCourses, 'data.allCourses');
    const vals = setCourseValuesFromURL(location, universities, departments, courses);

    if (allDepartments && allCourses) {
      if (!values.university?.value && vals.university?.value) {
        changeUniversity(allDepartments, allCourses, vals.university);
      }
      if (!values.department?.value && vals.department?.value) {
        changeDepartment(allCourses, vals.department);
      }
      if (!values.course?.value && vals.course?.value) {
        changeCourse(vals.course);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    courses,
    departments,
    getAllCourses,
    getAllDepartments,
    location,
    universities,
    values,
  ]);

  // e.g. autocompleteValue {value: "123", label: "NYC"}
  const handleChange = (e, autocompleteValue) => {
    const { id } = e.target;
    const { allDepartments } = getAllDepartments.data;
    const { allCourses } = getAllCourses.data;

    if (id.includes('university')) {
      changeUniversity(allDepartments, allCourses, autocompleteValue);
    } else if (id.includes('department')) {
      changeDepartment(allCourses, autocompleteValue);
    } else if (id.includes('course')) {
      changeCourse(autocompleteValue);
    } else if (id.includes('year')) {
      changeYear(autocompleteValue);
    }
  };

  const handleSubmit = async (courseFormValues) => {
    try {
      if (!get(courseFormValues, 'course.value') || !get(courseFormValues, 'year.value')) {
        setValidationError('All Course fields are required.');
      } else {
        setValidationError('');

        const clean = cleanProfile({
          ...profile,
          courseId: courseFormValues.course.value,
          year: courseFormValues.year.value,
        });

        await updateProfile({
          variables: {
            profile: clean,
          },
        });
      }
    } catch (err) {
      return err;
    }
  };

  const fetching = (
    getAllUniversities.loading || getAllDepartments.loading || getAllCourses.loading || loading
  );
  const fetchError = getAllUniversities.error || getAllDepartments.error || getAllCourses.error;
  const disabled = fetching || fetchError;

  return (
    <CourseFormLayout
      classes={classes}
      data={data}
      error={error}
      fetchError={fetchError}
      validationError={validationError}
      values={values}
      profile={profile}
      universities={universities}
      departments={departments}
      courses={courses}
      disabled={disabled}
      fetching={fetching}
      isEditing={!!editCourseValues}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};

export default CourseForm;
