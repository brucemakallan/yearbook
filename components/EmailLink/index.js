import React from 'react';

import Link from '@material-ui/core/Link';

const EmailLink = ({ email, ...rest }) => (
  <Link href={`mailto:${email}`} target="_blank" {...rest}>
    {email}
  </Link>
);

export default EmailLink;
