import React from 'react';
import get from 'lodash/get';
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';
import range from 'lodash/range';

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

export const createSortedSelectList = (collection) => sortBy(collection, (entity) => entity.name)
  .map(({ id, name }) => ({
    value: id,
    label: name,
  }));

export const getYearsToDate = (start = 1989) => range(new Date().getFullYear(), start).map((year) => ({
  value: year,
  label: String(year),
}));

export const isQueryReady = ({
  called, loading, error, data,
}) => !!called && !loading && !error && !!data;

export default renderInputWrapper;
