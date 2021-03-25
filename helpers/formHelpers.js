import React from 'react';
import get from 'lodash/get';
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';
import range from 'lodash/range';
import qs from 'qs';

import InputWrapper from '../components/Form';

const renderInputWrapper = (field) => <InputWrapper key={field.id} field={field} />;

export const getUniqueUniversities = (profiles) => {
  const universities = profiles.map((profile) => get(profile, 'course.department.university.id'));
  return uniq(universities);
};

export const getUniqueDepartments = (profiles) => {
  const departments = profiles.map((profile) => get(profile, 'course.department.id'));
  return uniq(departments);
};

export const getUniqueCourses = (profiles) => {
  const courses = profiles.map((profile) => get(profile, 'course.id'));
  return uniq(courses);
};

export const getDepartmentsInUniversity = (allDepartments, universityId) => (
  allDepartments.filter((department) => department.university.id === universityId)
);

export const getCoursesInDepartment = (allCourses, departmentId) => (
  allCourses.filter((course) => course.department.id === departmentId)
);

export const createSortedSelectList = (collection) => sortBy(collection, (entity) => entity.name)
  .map(({ id, name }) => ({
    value: id,
    label: name,
  }));

export const getYearsToDate = (start = 1989) => range(new Date().getFullYear(), start).map((year) => ({
  value: year,
  label: String(year),
}));

export const setDepartmentsInUniversity = (allDepartments, currentUniversity, setDepartments) => {
  const departmentsInUniversity = getDepartmentsInUniversity(allDepartments, currentUniversity);
  setDepartments(departmentsInUniversity);
  return departmentsInUniversity;
};

export const setCoursesInDepartment = (allCourses, currentDepartment, setCourses) => {
  const coursesInDepartment = getCoursesInDepartment(allCourses, currentDepartment);
  setCourses(coursesInDepartment);
  return coursesInDepartment;
};

export const setCourseValuesFromURL = (location, universities = [], departments = [], courses = []) => {
  const queryVariables = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const university = universities.find((uni) => uni.id === get(queryVariables, 'u'));
  const department = departments.find((dep) => dep.id === get(queryVariables, 'd'));
  const course = courses.find((crs) => crs.id === get(queryVariables, 'c'));

  return ({
    university: {
      value: get(university, 'id'),
      label: get(university, 'name'),
    },
    department: {
      value: get(department, 'id'),
      label: get(department, 'name'),
    },
    course: {
      value: get(course, 'id'),
      label: get(course, 'name'),
    },
  });
};

export const setQueryVariable = (universityId = '', departmentId = '', courseId = '') => {
  router.push(`?u=${universityId}&d=${departmentId}&c=${courseId}`);
  router.reload();
};

export default renderInputWrapper;
