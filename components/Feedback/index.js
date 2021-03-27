import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';

import CustomAlert from '../CustomAlert';

const Feedback = ({
  open,
  feedbackMessage,
  type,
  severity,
  error,
}) => {
  const [state, setState] = React.useState(open);

  if (error) {
    console.error(error);
  }

  const handleClose = () => {
    setState(false);
  };

  const renderSnackBar = (message, key = 0, vertical = 'top', horizontal = 'center') => (
    <Snackbar
      open={state}
      autoHideDuration={3000}
      onClose={handleClose}
      key={key}
      anchorOrigin={{
        vertical, horizontal,
      }}
    >
      <CustomAlert key={key} severity={type} message={message} />

    </Snackbar>
  );

  if (type === 'error' && feedbackMessage) {
    const { graphQLErrors, networkError } = feedbackMessage;

    if (graphQLErrors) {
      return (
        graphQLErrors.map(({ message }, index) => renderSnackBar(message, index))
      );
    }
    if (networkError) {
      return renderSnackBar(networkError);
    }
  }

  return renderSnackBar(feedbackMessage);
};

export default Feedback;
