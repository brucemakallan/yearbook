import React from 'react';

import Typography from '@material-ui/core/Typography';

const SectionTitle = ({ classes, title }) => (
  <div className={classes.sectionTitle}>
    <Typography variant="h6" color="primary">
      {title}
    </Typography>
  </div>
);

export default SectionTitle;
