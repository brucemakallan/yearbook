import React from 'react';
import get from 'lodash/get';
import upperCase from 'lodash/upperCase';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/react-hooks';

import PageWithSidebar from '../../../../../../components/DashboardComponents/PageWithSidebar';
import tabs from '../../../../../../components/DashboardPages/Department/tabs';
import DepartmentForm from '../../../../../../components/DashboardPages/Department/departmentForm';
import getCurrentUniversityFromCache from '../../../../../../helpers/cacheManagement';

const tabIndex = 1;

const CreateDepartment = () => {
  const router = useRouter();
  const { universityId } = router.query;
  const client = useApolloClient();

  const currentUniversity = getCurrentUniversityFromCache(client, universityId);
  const currentUniversityName = get(currentUniversity, 'name');

  const handleOnCompleted = () => {
    router.push(`/dashboard/institutions/${universityId}/departments`);
  };

  return (
    currentUniversity ? (
      <PageWithSidebar
        title={currentUniversityName ? upperCase(currentUniversityName) : 'DEPARTMENT'}
        tabs={tabs(universityId)}
        tabIndex={tabIndex}
      >
        <DepartmentForm currentUniversity={currentUniversity} handleOnCompleted={handleOnCompleted} />
      </PageWithSidebar>
    ) : ''
  );
};

export default CreateDepartment;
