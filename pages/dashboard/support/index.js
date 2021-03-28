import React from 'react';
import Grid from '@material-ui/core/Grid';

import ContactForm from '../../../components/DashboardPages/ContactForm/contactForm';
import PageWithSidebar from '../../../components/DashboardComponents/PageWithSidebar';

const SupportPage = () => (
  <>
    <PageWithSidebar title="Contact Support">
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <ContactForm />
        </Grid>
      </Grid>
    </PageWithSidebar>
  </>
);

export default SupportPage;
