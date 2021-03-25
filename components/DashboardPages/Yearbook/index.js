import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/get';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AllStudents from '../Student/allStudents';
import CustomAlert from '../../../components/CustomAlert';
import PdfGenerator from '../../../components/PdfGenerator';
import FullScreenDialogButton from '../../../components/FullScreenDialogButton';
import { GET_ALL_PROFILES_QUERY } from '../../../graphql/profile/queries';
import Loader from '../../../components/Loader';
import {
  getUniqueUniversities, getUniqueDepartments, getUniqueCourses,
} from '../../../helpers/formHelpers';

const INSTRUCTIONS = `
  Hey there 🙂 Use the search and filter features to narrow down the list of students you wish to 
  generate a Yearbook for, then just click 'Generate Yearbook'.
`;

const Yearbook = () => {
  const [students, setStudents] = React.useState(0);
  const [universities, setUniversities] = React.useState(0);
  const [departments, setDepartments] = React.useState(0);
  const [courses, setCourses] = React.useState(0);

  const [allStudents, setAllStudents] = React.useState([]);
  const [selectedData, setSelectedData] = React.useState([]);

  const getAllStudents = useQuery(GET_ALL_PROFILES_QUERY);

  const TABLE_CHANGE_ACTIONS = ['search', 'onSearchClose', 'filterChange'];
  const INDEX_OF_ID_IN_TABLE = 0;

  React.useEffect(() => {
    if (get(getAllStudents, 'data.allProfilesInUniversity')) {
      const allProfilesInUniversity = get(getAllStudents, 'data.allProfilesInUniversity');
      const profilesWithRegistrationNumbers = allProfilesInUniversity
        .filter((profile) => !!get(profile, 'course.id'));
      setAllStudents(profilesWithRegistrationNumbers);

      // Ensure 'selectedData' is in the same format as 'displayData'
      // displayData = [ { data: [ id, ...otherColumns ] }, { ... }, ... ]
      setSelectedData(profilesWithRegistrationNumbers.map((profile) => ({
        data: [profile.id],
      })));
    }
  }, [getAllStudents]);

  const getFilteredStudentProfiles = (filteredColumns) => {
    const filteredStudentIds = filteredColumns.map(({ data }) => data[INDEX_OF_ID_IN_TABLE]);
    return allStudents.filter(({ id }) => filteredStudentIds.includes(id));
  };

  const onTableChange = (actionTriggered, { displayData }) => {
    if (TABLE_CHANGE_ACTIONS.includes(actionTriggered)) {
      setSelectedData(displayData);
    }

    const filteredStudentProfiles = getFilteredStudentProfiles(displayData);

    setStudents(filteredStudentProfiles.length);
    setUniversities(getUniqueUniversities(filteredStudentProfiles).length);
    setDepartments(getUniqueDepartments(filteredStudentProfiles).length);
    setCourses(getUniqueCourses(filteredStudentProfiles).length);
  };

  const filteredStudentProfiles = getFilteredStudentProfiles(selectedData);

  return (
    <AllStudents
      pageTitle='YEARBOOKS'
      onTableChange={onTableChange}
      whiteBackground
    >
      <CustomAlert message={INSTRUCTIONS} severity="info" />

      {getAllStudents.loading && <Loader />}

      <Grid container spacing={2} justify="space-between">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {filteredStudentProfiles && filteredStudentProfiles.length > 0 && (
            <FullScreenDialogButton
              dialogTitle="Yearbook PDF"
              buttonText="Generate Yearbook"
              buttonProps={{
                variant: 'contained',
                color: 'primary',
              }}
            >
              <PdfGenerator
                students={students}
                courses={courses}
                departments={departments}
                universities={universities}
                filteredStudentProfiles={filteredStudentProfiles}
              />
            </FullScreenDialogButton>
          )}
        </Grid>
      </Grid>

      <Typography variant="body2">
        <strong>Current Selection: </strong>
        {`${students} STUDENT${students > 1 ? 'S' : ''}`}
        {` in ${courses} COURSE${courses > 1 ? 'S' : ''}`}
        {` and ${departments} DEPARTMENT${departments > 1 ? 'S' : ''}`}
      </Typography>
    </AllStudents>
  );
};

export default Yearbook;
