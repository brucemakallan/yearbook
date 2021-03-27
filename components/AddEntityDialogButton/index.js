import React from 'react';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';

// TIP: Takes a form e.g AddUniversityForm as a child
const AddEntityDialogButton = ({ children, title, disabled }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} maxWidth="xs" fullWidth>
        <DialogTitle>{title}</DialogTitle>
        {children}
      </Dialog>
      <Grid container spacing={2}>
        <IconButton
          color="secondary"
          component="span"
          aria-label="add university"
          onClick={handleClickOpen}
          disabled={disabled}
        >
          <AddIcon />
        </IconButton>
      </Grid>
    </>
  );
};

export default AddEntityDialogButton;
