import React from 'react';
import { useRouter } from 'next/router';

import UniversityForm from '../../../../components/DashboardPages/University/universityForm';
import tabs from '../../../../components/DashboardPages/University/tabs';
import PageWithSidebar from '../../../../components/DashboardComponents/PageWithSidebar';

const tabIndex = 1;

const CreateUniversity = () => {
  const router = useRouter();

  const handleOnCompleted = () => {
    router.push('/dashboard/universities');
  };

  return (
    <PageWithSidebar title="CREATE UNIVERSITY" tabs={tabs} tabIndex={tabIndex}>
      <UniversityForm handleOnCompleted={handleOnCompleted} />
    </PageWithSidebar>
  );
};

export default CreateUniversity;
