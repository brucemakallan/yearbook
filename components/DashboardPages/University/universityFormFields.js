import React from 'react';

import { institutionTypes } from '../../../helpers/enums';
import AutocompleteField from '../../Form/autocompleteField';

export const initialValues = {
  name: '',
  institutionType: {
    value: institutionTypes[0].value,
    label: institutionTypes[0].label,
  },
};

export const formInputFields = ({ handleChange, values }) => [
  {
    id: 'institutionType',
    label: 'Type of Educational Institution',
    onChange: handleChange,
    options: institutionTypes,
    value: values?.institutionType,
    componentType: AutocompleteField,
    required: true,
    isEditing: true, // fill width
  },
  {
    id: 'name',
    placeholder: 'Institution Name',
    required: true,
  },
];
