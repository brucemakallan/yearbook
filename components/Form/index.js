import React from 'react';
import { ErrorMessage, Field } from 'formik';
import startCase from 'lodash/startCase';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';

import useStyles from './styles';
import AutocompleteField from './autocompleteField';
import PasswordField from './passwordField';

const InputWrapper = ({ field }) => {
  const {
    id,
    multilineRows,
    placeholder,
    type = 'text',
    name = field.id,
    label = field.label || startCase(field.id),
    componentType = TextField,
    options = [],
    onChange,
    value,
    disabled,
    startAdornment,
    maxCharacters,
    actionButton,
    isEditing,
  } = field;

  const classes = useStyles();

  let formikField = (
    <Field
      as={componentType}
      id={id}
      name={name}
      label={label}
      type={type}
      placeholder={placeholder}
      variant='standard'
      fullWidth
      multiline={multilineRows !== undefined}
      rows={multilineRows}
      rowsMax={multilineRows ? 5 : undefined}
      InputProps={{
        startAdornment: startAdornment
          ? <InputAdornment position="start">{startAdornment}</InputAdornment>
          : undefined,
      }}
      inputProps={{
        maxLength: maxCharacters,
      }}
    />
  );

  if (componentType === TextField && type === 'password') {
    formikField = (
      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Field as={PasswordField} id={id} name={name} />
      </FormControl>
    );
  }

  if (componentType === Select) {
    formikField = (
      <FormControl fullWidth>
        <InputLabel id={id}>{label}</InputLabel>
        <Field as={componentType} id={id} name={name}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Field>
      </FormControl>
    );
  }

  if (componentType === AutocompleteField) {
    const grid = isEditing
      ? {
        xs: 12, sm: 12, md: 12, lg: 12,
      }
      : {
        xs: 10, sm: 11, md: 11, lg: 11,
      };

    formikField = (
      <Grid container alignItems="flex-end">
        <Grid item xs={grid.xs} sm={grid.sm} md={grid.md} lg={grid.lg}>
          <Field
            as={componentType}
            id={id}
            label={label}
            onChange={onChange}
            options={options}
            value={value}
            disabled={disabled}
            variant='standard'
            fullWidth
          />
        </Grid>
        {!isEditing && (
          <Grid item xs={2} sm={1} md={1} lg={1}>
            {actionButton}
          </Grid>
        )}
      </Grid>
    );
  }

  return (
    <div className={classes.inputFields}>
      {formikField}
      <ErrorMessage name={name} component="div" className={classes.error} />
    </div>
  );
};

export default InputWrapper;
