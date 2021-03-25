import React from 'react';

import Page from '../../../components/GenericDashboard/Page';
import UniversityForm from './universityForm';
import tabs from './tabs';

const tabIndex = 1;

const CreateUniversity = () => (
  <Page
    title="CREATE UNIVERSITY"
    tabLinks={tabs}
    tabIndex={tabIndex}
    tabValue={tabIndex}
  >
    <UniversityForm />
  </Page>
);

export default CreateUniversity;
