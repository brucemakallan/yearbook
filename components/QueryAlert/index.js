import React from 'react';

import Feedback from '../Feedback';
import Loader from '../Loader';

const QueryAlert = ({ loading, error }) => (
  <>
    {loading && <Loader />}
    {error && (
      <Feedback
        open={!!error}
        feedbackMessage={error}
        severity='error'
        type='error'
      />
    )}
  </>
);

export default QueryAlert;
