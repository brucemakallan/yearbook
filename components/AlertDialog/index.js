import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const AlertDialog = ({
  children,
  buttonText,
  buttonProps,
  title,
  handleYes,
  confirmButtonText = 'Yes',
  cancelButtonText = 'Cancel',
  hideToggleDialogButton = false,
  hideCancelButton = false,
}) => {
  const [open, setOpen] = React.useState(hideToggleDialogButton);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    handleYes();
    handleClose();
  };

  return (
    <Box component="span">
      {!hideToggleDialogButton && (
        <Button {...buttonProps} onClick={handleClickOpen}>
          {buttonText}
        </Button>
      )}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        {children && <DialogContent>{children}</DialogContent>}
        <DialogActions>
          {!hideCancelButton && (
            <Button onClick={handleClose} color="primary">
              {cancelButtonText}
            </Button>
          )}
          <Button onClick={handleAccept} color="primary">
            {confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AlertDialog;
