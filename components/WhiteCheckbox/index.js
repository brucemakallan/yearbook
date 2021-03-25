import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const WhiteCheckbox = withStyles(
  {
    root: {
      color: 'white',
      '&$checked': {
        color: 'white',
      },
    },
    checked: {
    },
  },
)((props) => <Checkbox color="default" {...props} />);

export default WhiteCheckbox;
