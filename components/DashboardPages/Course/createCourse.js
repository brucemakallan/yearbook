import React from 'react';
import get from 'lodash/get';
import upperCase from 'lodash/upperCase';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/react-hooks';

import Page from '../../../components/GenericDashboard/Page';
import tabs from './tabs';
import CourseForm from './courseForm';
import { getCurrentDepartmentFromCache } from '../../../helpers/cacheManagement';

const tabIndex = 1;

const CreateCourse = () => {
  const router = useRouter();
  const { universityId, departmentId } = router.query;
  const client = useApolloClient();

  const currentDepartment = getCurrentDepartmentFromCache(client, universityId, departmentId, router);
  const currentDepartmentName = get(currentDepartment, 'name');

  return (
    currentDepartment ? (
      <Page
        title={currentDepartmentName ? upperCase(currentDepartmentName) : 'COURSE'}
        tabLinks={tabs(universityId, departmentId)}
        tabIndex={tabIndex}
        tabValue={tabIndex}
      >
        <CourseForm currentDepartment={currentDepartment} />
      </Page>
    ) : ''
  );
};

export default CreateCourse;
