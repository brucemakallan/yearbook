import React from 'react';
import get from 'lodash/get';
import upperCase from 'lodash/upperCase';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/react-hooks';

import PageWithSidebar from '../../../../../../../components/DashboardComponents/PageWithSidebar';
import tabs from '../../../../../../../components/DashboardPages/Course/tabs';
import CourseForm from '../../../../../../../components/DashboardPages/Course/courseForm';
import { getCurrentDepartmentFromCache } from '../../../../../../../helpers/cacheManagement';

const tabIndex = 1;

const CreateCourse = () => {
  const router = useRouter();
  const { universityId, departmentId } = router.query;
  const client = useApolloClient();

  const currentDepartment = getCurrentDepartmentFromCache(client, universityId, departmentId);
  const currentDepartmentName = get(currentDepartment, 'name');

  return (
    currentDepartment ? (
      <PageWithSidebar
        title={currentDepartmentName ? upperCase(currentDepartmentName) : 'COURSE'}
        tabs={tabs(universityId, departmentId)}
        tabIndex={tabIndex}
      >
        <CourseForm currentDepartment={currentDepartment} />
      </PageWithSidebar>
    ) : ''
  );
};

export default CreateCourse;
