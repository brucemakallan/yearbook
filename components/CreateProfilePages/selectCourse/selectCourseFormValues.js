import React from 'react';
import get from 'lodash/get';

import AutocompleteField from '../../Form/autocompleteField';
import AddEntityDialogButton from '../../AddEntityDialogButton';
import UniversityForm from '../../DashboardPages/University/universityForm';
import DepartmentForm from '../../DashboardPages/Department/departmentForm';
import CourseForm from '../../DashboardPages/Course/courseForm';
import { createSortedSelectList, getYearsToDate } from '../../../helpers/formHelpers';
import { institutionTypes } from '../../../helpers/enums';

const init = {
  value: '',
  label: '',
};

export const initialValues = {
  institutionType: {
    value: institutionTypes[0].value,
    label: institutionTypes[0].label,
  },
  university: init,
  department: init,
  course: init,
  year: init,
};

export const formInputFields = ({
  handleChange,
  handleOnCompleted,
  universities,
  departments,
  courses,
  values,
  disabled,
  isEditing,
}) => {
  const currentUniversity = universities.find((u) => u.id === get(values, 'university.value'));
  const currentDepartment = departments.find((d) => d.id === get(values, 'department.value'));

  return [
    {
      id: 'institutionType',
      label: 'Type of Educational Institution',
      onChange: handleChange,
      options: institutionTypes,
      isEditing,
      value: values?.institutionType,
      componentType: AutocompleteField,
      required: true,
    },
    {
      id: 'university',
      label: 'Institution',
      onChange: handleChange,
      options: createSortedSelectList(universities),
      value: get(values, 'university', null),
      disabled,
      componentType: AutocompleteField,
      isEditing,
      required: true,
      actionButton: (
        <AddEntityDialogButton title="Create Institution">
          <UniversityForm
            handleOnCompleted={handleOnCompleted}
            fullWidth
          />
        </AddEntityDialogButton>
      ),
    },
    {
      id: 'department',
      label: 'Department',
      onChange: handleChange,
      options: createSortedSelectList(departments),
      value: get(values, 'department', null),
      disabled,
      componentType: AutocompleteField,
      isEditing,
      required: true,
      actionButton: (
        <AddEntityDialogButton title="Create Department" disabled={!get(currentUniversity, 'id')}>
          <DepartmentForm
            currentUniversity={currentUniversity}
            handleOnCompleted={handleOnCompleted}
            fullWidth
          />
        </AddEntityDialogButton>
      ),
    },
    {
      id: 'course',
      label: 'Course',
      onChange: handleChange,
      options: createSortedSelectList(courses),
      value: get(values, 'course', null),
      disabled,
      componentType: AutocompleteField,
      isEditing,
      required: true,
      actionButton: (
        <AddEntityDialogButton
          title="Create Course"
          disabled={!get(currentUniversity, 'id') || !get(currentDepartment, 'id')}
        >
          <CourseForm
            currentDepartment={currentDepartment}
            handleOnCompleted={handleOnCompleted}
            fullWidth
          />
        </AddEntityDialogButton>
      ),
    },
    {
      id: 'year',
      label: 'Year of Entry',
      onChange: handleChange,
      options: getYearsToDate(),
      isEditing,
      value: get(values, 'year', null),
      componentType: AutocompleteField,
      required: true,
    },
  ];
};
