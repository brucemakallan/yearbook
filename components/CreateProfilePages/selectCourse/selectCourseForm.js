// This Form is used to select a university department and course for the current user
// NOT to be confused with the one used to create a Course
import React, { useState } from 'react';
import get from 'lodash/get';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import { UPDATE_PROFILE_MUTATION } from '../../../graphql/profile/mutations';
import { cleanProfile } from '../createProfile/validation';
import SelectCourseFormLayout from './selectCourseFormLayout';
import { initialValues } from './selectCourseFormValues';
import { GET_INSTITUTIONS_BY_CLASSIFICATION_QUERY } from '../../../graphql/university/queries';
import { GET_ALL_DEPARTMENTS_IN_UNIVERSITY_QUERY } from '../../../graphql/department/queries';
import { GET_ALL_COURSES_IN_DEPARTMENT_QUERY } from '../../../graphql/course/queries';
import { isQueryReady } from '../../../helpers/formHelpers';

const SelectCourseForm = ({ classes, profile, editCourseValues }) => {
  const router = useRouter();

  const [universities, setUniversities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [values, setValues] = useState(editCourseValues || initialValues);
  const [validationError, setValidationError] = useState();

  const [departmentsQueryExecute, departmentsQuery] = useLazyQuery(GET_ALL_DEPARTMENTS_IN_UNIVERSITY_QUERY);
  const [coursesQueryExecute, coursesQuery] = useLazyQuery(GET_ALL_COURSES_IN_DEPARTMENT_QUERY);
  const universitiesQuery = useQuery(GET_INSTITUTIONS_BY_CLASSIFICATION_QUERY, {
    variables: { classification: 0 },
  });

  const [updateProfile, updateProfileMutation] = useMutation(UPDATE_PROFILE_MUTATION);

  React.useEffect(() => {
    const courseExists = profile?.course?.id || updateProfileMutation.data?.updateProfile?.course?.id;
    if (courseExists && !editCourseValues) {
      router.push('/dashboard');
    }
  }, [updateProfileMutation, editCourseValues, profile, router]);

  React.useEffect(() => {
    if (isQueryReady(universitiesQuery)) {
      setUniversities(universitiesQuery.data?.institutionsByClassification);
    }
    if (isQueryReady(departmentsQuery)) {
      setDepartments(departmentsQuery.data?.allDepartmentsInUniversity);
    }
    if (isQueryReady(coursesQuery)) {
      setCourses(coursesQuery.data?.allCoursesInDepartment);
    }
  }, [universitiesQuery, departmentsQuery, coursesQuery]);

  // e.g. autocompleteValue {value: "<ID>", label: "NYC"}
  const handleChange = (e, autocompleteValue) => {
    const { id } = e.target;
    const { value } = autocompleteValue;

    if (id.includes('institutionType')) {
      universitiesQuery.refetch({ classification: value });
      setValues({
        institutionType: autocompleteValue,
      });
    } else if (id.includes('university')) {
      departmentsQueryExecute({ variables: { universityId: value } });
      setValues({
        institutionType: values.institutionType,
        university: autocompleteValue,
      });
    } else if (id.includes('department')) {
      coursesQueryExecute({ variables: { departmentId: value } });
      setValues({
        institutionType: values.institutionType,
        university: values.university,
        department: autocompleteValue,
      });
    } else if (id.includes('course')) {
      setValues({
        ...values,
        course: autocompleteValue,
      });
    } else if (id.includes('year')) {
      setValues({
        ...values,
        year: autocompleteValue,
      });
    }
  };

  // After creating an entity via the dialog / popup
  const handleOnCompleted = (onCompletedData) => {
    if (onCompletedData) {
      const createdUniversity = onCompletedData?.createUniversity;
      const createdDepartment = onCompletedData?.createDepartment;
      const createdCourse = onCompletedData?.createCourse;

      const entityCreated = createdUniversity || createdDepartment || createdCourse;
      // eslint-disable-next-line no-underscore-dangle
      const id = String(entityCreated?.__typename).toLowerCase();

      const event = { target: { id } };
      const dropdownValue = {
        value: entityCreated?.id,
        label: entityCreated?.name,
      };

      handleChange(event, dropdownValue);
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
          universityId: courseFormValues.university.value,
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
    universitiesQuery.loading || departmentsQuery.loading
    || coursesQuery.loading || updateProfileMutation.loading
  );
  const fetchError = universitiesQuery.error || departmentsQuery.error || coursesQuery.error;
  const disabled = fetching || fetchError;

  return (
    <SelectCourseFormLayout
      classes={classes}
      data={updateProfileMutation.data}
      error={updateProfileMutation.error}
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
      handleOnCompleted={handleOnCompleted}
    />
  );
};

export default SelectCourseForm;
