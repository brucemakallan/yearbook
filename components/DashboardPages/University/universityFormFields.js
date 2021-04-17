import React from 'react';

import { institutionTypes } from '../../../helpers/enums';
import AutocompleteField from '../../Form/autocompleteField';

export const initialValues = (institutionType) => ({
  name: '',
  institutionType: institutionType || {
    value: institutionTypes[0].value,
    label: institutionTypes[0].label,
  },
});

export const formInputFields = ({ handleChange, values, disableInstituteType }) => [
  {
    id: 'institutionType',
    label: 'Type of Educational Institution',
    onChange: handleChange,
    options: institutionTypes,
    value: values?.institutionType,
    componentType: AutocompleteField,
    required: true,
    isEditing: true, // fill width
    hide: disableInstituteType,
  },
  {
    id: 'name',
    placeholder: 'Institution Name',
    required: true,
  },
];
