import React from 'react';

import Feedback from '../Feedback';
import Loader from '../Loader';

const QueryAlert = ({
  loading,
  error,
  data,
  successMessage,
}) => (
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
    {data && (
      <Feedback
        open={!!data}
        feedbackMessage={successMessage}
        severity='success'
        type='success'
      />
    )}
  </>
);

export default QueryAlert;
