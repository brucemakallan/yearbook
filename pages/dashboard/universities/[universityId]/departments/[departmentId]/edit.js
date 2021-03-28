import React, { useEffect, useState } from 'react';
import get from 'lodash/get';
import upperCase from 'lodash/upperCase';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import Loader from '../../../../../../components/Loader';
import Feedback from '../../../../../../components/Feedback';
import PageWithSidebar from '../../../../../../components/DashboardComponents/PageWithSidebar';
import { GET_SINGLE_DEPARTMENT_QUERY } from '../../../../../../graphql/department/queries';
import DepartmentForm from '../../../../../../components/DashboardPages/Department/departmentForm';
import getCurrentUniversityFromCache from '../../../../../../helpers/cacheManagement';

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

  const currentUniversity = getCurrentUniversityFromCache(client, universityId);
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
        <PageWithSidebar
          title={currentUniversityName ? upperCase(currentUniversityName) : 'DEPARTMENT'}
        >
          {currentUniversity && (
            <DepartmentForm department={department} currentUniversity={currentUniversity} />
          )}
        </PageWithSidebar>
      )}
    </>
  );
};

export default EditDepartment;
