import React from 'react';
import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import BusinessIcon from '@material-ui/icons/Business';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import SchoolIcon from '@material-ui/icons/School';
import PersonIcon from '@material-ui/icons/Person';

import Page from '../../../components/GenericDashboard/Page';
import SvgRender from '../../../components/SvgRender';
import { svgs } from '../../../styles/global-theme';
import { GET_ALL_PROFILES_QUERY } from '../../../graphql/profile/queries';
import NumberField from '../../../components/NumberField';
import Loader from '../../../components/Loader';
import {
  getUniqueUniversities, getUniqueDepartments, getUniqueCourses,
} from '../../../helpers/formHelpers';

const useStyles = makeStyles((theme) => ({
  vector: {
    [theme.breakpoints.up('md')]: {
      marginTop: -70,
    },
  },
}));

const DashboardStats = () => {
  const classes = useStyles();

  const [students, setStudents] = React.useState(0);
  const [universities, setUniversities] = React.useState(0);
  const [departments, setDepartments] = React.useState(0);
  const [courses, setCourses] = React.useState(0);

  const getAllStudents = useQuery(GET_ALL_PROFILES_QUERY);

  React.useEffect(() => {
    // TODO: When re-implementing stats, use "allProfilesInUniversity" instead
    const allProfiles = get(getAllStudents, 'data.allProfiles', []);
    setStudents(allProfiles.length);
    setUniversities(getUniqueUniversities(allProfiles).length);
    setDepartments(getUniqueDepartments(allProfiles).length);
    setCourses(getUniqueCourses(allProfiles).length);
  }, [getAllStudents]);

  return (
    <Page
      title='STATS'
      whiteBackground
    >
      <Grid container spacing={2} justify="center">
        {getAllStudents.loading && <Loader />}

        <Grid item xs={6} sm={6} md={3} lg={2}>
          <NumberField
            number={students}
            icon={<PersonIcon color="primary" />}
            text={`STUDENT${students > 1 ? 'S' : ''}`}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={2}>
          <NumberField
            number={courses}
            icon={<SchoolIcon color="primary" />}
            text={`COURSE${courses > 1 ? 'S' : ''}`}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={2}>
          <NumberField
            number={departments}
            icon={<HomeWorkIcon color="primary" />}
            text={`DEPARTMENT${departments > 1 ? 'S' : ''}`}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={2}>
          <NumberField
            number={universities}
            icon={<BusinessIcon color="primary" />}
            text={`UNIVERSIT${universities > 1 ? 'IES' : 'Y'}`}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={10} lg={10} className={classes.vector}>
          <SvgRender path={svgs.vectorStats} />
        </Grid>
      </Grid>
    </Page>
  );
};

export default DashboardStats;
