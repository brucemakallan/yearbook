import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: theme.spacing(0.5),
  },
}));

// TIP: Takes a form e.g AddUniversityForm as a child
const AddEntityDialogButton = ({ children, title, disabled }) => {
  const classes = useStyles();

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
      <IconButton
        color="secondary"
        aria-label="add university"
        onClick={handleClickOpen}
        disabled={disabled}
        className={classes.iconButton}
      >
        <AddIcon />
      </IconButton>
    </>
  );
};

export default AddEntityDialogButton;
