import React, { useEffect, useState } from 'react';
import get from 'lodash/get';
import upperCase from 'lodash/upperCase';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import Loader from '../../../components/Loader';
import Feedback from '../../../components/Feedback';
import Page from '../../DashboardComponents/Page';
import { GET_SINGLE_DEPARTMENT_QUERY } from '../../../graphql/department/queries';
import DepartmentForm from './departmentForm';
import getCurrentUniversityFromCache from '../../../helpers/cacheManagement';

const EditDepartment = () => {
  const router = useRouter();
  const { universityId, departmentId } = router.query;
  const client = useApolloClient();

  const [department, setDepartment] = useState();

  const getSingleDepartment = useQuery(GET_SINGLE_DEPARTMENT_QUERY, {
    variables: {
      searchParams: {
        universityId,
        departmentId,
      },
    },
  });

  const currentUniversity = getCurrentUniversityFromCache(client, universityId, router);
  const currentUniversityName = get(currentUniversity, 'name');

  useEffect(() => {
    const singleDepartment = get(getSingleDepartment, 'data.singleDepartment');
    setDepartment(singleDepartment);
  }, [getSingleDepartment]);

  return (
    <>
      {getSingleDepartment.loading && <Loader />}
      {getSingleDepartment.error && (
        <Feedback
          open={!!getSingleDepartment.error}
          feedbackMessage={getSingleDepartment.error}
          severity='error'
          type='error'
        />
      )}
      {department && (
        <Page
          title={currentUniversityName ? upperCase(currentUniversityName) : 'DEPARTMENT'}
        >
          {currentUniversity && (
            <DepartmentForm department={department} currentUniversity={currentUniversity} />
          )}
        </Page>
      )}
    </>
  );
};

export default EditDepartment;
