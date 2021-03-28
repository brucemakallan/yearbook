import React from 'react';

import UniversityForm from '../../../../components/DashboardPages/University/universityForm';
import tabs from '../../../../components/DashboardPages/University/tabs';
import PageWithSidebar from '../../../../components/DashboardComponents/PageWithSidebar';

const tabIndex = 1;

const CreateUniversity = () => (
  <PageWithSidebar title="CREATE UNIVERSITY" tabs={tabs} tabIndex={tabIndex}>
    <UniversityForm />
  </PageWithSidebar>
);

export default CreateUniversity;
