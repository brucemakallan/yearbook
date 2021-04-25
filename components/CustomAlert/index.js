import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = (compact) => makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: compact ? 0 : theme.spacing(3),
  },
}));

const ActionButton = ({ setOpen }) => (
  <IconButton
    aria-label="close"
    color="inherit"
    size="small"
    onClick={() => {
      setOpen(false);
    }}
  >
    <CloseIcon fontSize="inherit" />
  </IconButton>
);

const CustomAlert = ({
  severity, message, canClose = true, compact,
}) => {
  const classes = useStyles(compact)();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        {!!message && (
          <Alert
            severity={severity}
            action={canClose ? <ActionButton setOpen={setOpen} /> : undefined}
          >
            {message}
          </Alert>
        )}
      </Collapse>
    </div>
  );
};

export default CustomAlert;
