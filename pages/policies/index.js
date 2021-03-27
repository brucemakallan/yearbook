import React from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

import PublicPage from '../../components/PublicPage';
import CookiesPolicy from '../../components/CookiesPolicy';

const PoliciesPage = () => (
  <PublicPage title="Policies">
    <Grid container justify="center">
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="policy-content"
            id="policy-header"
          >
            <Typography>Cookie Policy</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CookiesPolicy />
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  </PublicPage>
);

export default PoliciesPage;
