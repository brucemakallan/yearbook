import React from 'react';
import get from 'lodash/get';

import Typography from '@material-ui/core/Typography';
import BusinessIcon from '@material-ui/icons/Business';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import SchoolIcon from '@material-ui/icons/School';

const CourseSection = ({ classes, singleProfile }) => (
  <div className={classes.courseSection}>
    <div className={classes.infoBox}>
      <BusinessIcon color="primary" />
      <Typography variant="body2" color="primary">
        {get(singleProfile, 'course.department.university.name')}
      </Typography>
    </div>
    <div className={classes.infoBox}>
      <HomeWorkIcon color="primary" />
      <Typography variant="body2" color="primary">
        {get(singleProfile, 'course.department.name')}
      </Typography>
    </div>
    <div className={classes.infoBox}>
      <SchoolIcon color="primary" />
      <Typography variant="body2" color="primary">
        {get(singleProfile, 'course.name')}
      </Typography>
    </div>
  </div>
);

export default CourseSection;
