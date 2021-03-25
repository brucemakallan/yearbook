import React from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import AlertDialog from '../AlertDialog';
import { acceptCookies } from '../../helpers/cookies';

const CookiesDialog = () => (
  <AlertDialog
    title="Cookies"
    handleYes={acceptCookies}
    confirmButtonText="Continue"
    hideToggleDialogButton
    hideCancelButton
  >
    <Typography variant="body2">
      Please note that this site uses Cookies. Cookies are small pieces of text used
      to store information on web browsers. We use cookies to make some of the content
      available to you and to create a personalised experience. By continuing to use
      our services, you acknowledge that
      our <Link target="_blank" rel="noopener" href="/policies">Cookies Policy</Link> applies
      to you.
    </Typography>
  </AlertDialog>
);

export default CookiesDialog;
