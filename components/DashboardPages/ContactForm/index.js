import React from 'react';
import Grid from '@material-ui/core/Grid';

import ContactForm from './contactForm';
import Page from '../../DashboardComponents/Page';

const SupportPage = () => (
  <>
    <Page
      title={'Contact Support'}
    >
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <ContactForm />
        </Grid>
      </Grid>
    </Page>
  </>
);

export default SupportPage;
