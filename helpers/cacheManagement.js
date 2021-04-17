import get from 'lodash/get';

import { getDecodedToken, getToken } from './jwt';
import { GET_ALL_UNIVERSITIES_QUERY } from '../graphql/university/queries';
import { GET_ALL_DEPARTMENTS_IN_UNIVERSITY_QUERY } from '../graphql/department/queries';
import { GET_SINGLE_PROFILE_QUERY } from '../graphql/profile/queries';

const redirect = (to) => {
  if (typeof window !== 'undefined') {
    window.location.replace(to);
  }
};

const getCurrentUniversityFromCache = (apolloClient, universityId) => {
  try {
    const cachedUniversities = apolloClient.readQuery({
      query: GET_ALL_UNIVERSITIES_QUERY,
    });

    const allUniversities = get(cachedUniversities, 'allUniversities', []);
    const currentUniversity = allUniversities.find((university) => university.id === universityId);

    return currentUniversity;
  } catch (err) {
    redirect('/dashboard/institutions');
  }
};

export const getCurrentDepartmentFromCache = (apolloClient, universityId, departmentId) => {
  try {
    const cachedDepartments = apolloClient.readQuery({
      query: GET_ALL_DEPARTMENTS_IN_UNIVERSITY_QUERY,
      variables: {
        universityId,
      },
    });

    const allDepartmentsInUniversity = get(cachedDepartments, 'allDepartmentsInUniversity', []);
    const currentDepartment = allDepartmentsInUniversity.find((department) => department.id === departmentId);

    return currentDepartment;
  } catch (err) {
    redirect('/dashboard/institutions');
  }
};

export const getStudentProfileFromCache = (apolloClient) => {
  try {
    const user = getDecodedToken(getToken());

    const cachedProfile = apolloClient.readQuery({
      query: GET_SINGLE_PROFILE_QUERY,
      variables: {
        searchParams: {
          userId: get(user, '_id'),
        },
      },
    });
    return cachedProfile;
  } catch (err) {
    return err;
  }
};

export default getCurrentUniversityFromCache;
