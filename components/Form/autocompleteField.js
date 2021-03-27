import React from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// option = {
//   label,
//   value, // use ids as values
// }

const AutocompleteField = ({
  id,
  label,
  variant,
  fullWidth,
  onChange,
  options,
  value,
  disabled,
}) => (
  <Autocomplete
    id={id}
    options={options}
    getOptionLabel={(option) => option.label}
    fullWidth={fullWidth}
    onChange={onChange}
    value={value}
    disabled={disabled}
    getOptionSelected={(option, val) => option.value === val.value}
    renderInput={(params) => <TextField {...params} name={id} label={label} variant={variant} />}
    autoHighlight
    renderOption={(option, input) => {
      const matches = match(option.label, input.inputValue);
      const parts = parse(option.label, matches);

      return (
        <div style={{
          pointerEvents: 'none', // prevent click
        }}>
          {parts.map((part, index) => (
            <span key={index} style={{
              fontWeight: part.highlight ? 700 : 400,
              pointerEvents: 'none',
            }}>
              {part.text}
            </span>
          ))}
        </div>
      );
    }}
  />
);

export default AutocompleteField;
