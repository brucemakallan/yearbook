import React from 'react';
import get from 'lodash/get';
import upperCase from 'lodash/upperCase';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/react-hooks';

import Page from '../../../components/GenericDashboard/Page';
import tabs from './tabs';
import DepartmentForm from './departmentForm';
import getCurrentUniversityFromCache from '../../../helpers/cacheManagement';

const tabIndex = 1;

const CreateDepartment = () => {
  const router = useRouter();
  const { universityId } = router.query;
  const client = useApolloClient();

  const currentUniversity = getCurrentUniversityFromCache(client, universityId, router);
  const currentUniversityName = get(currentUniversity, 'name');

  return (
    currentUniversity ? (
      <Page
        title={currentUniversityName ? upperCase(currentUniversityName) : 'DEPARTMENT'}
        tabLinks={tabs(universityId)}
        tabIndex={tabIndex}
        tabValue={tabIndex}
      >
        <DepartmentForm currentUniversity={currentUniversity} />
      </Page>
    ) : ''
  );
};

export default CreateDepartment;
