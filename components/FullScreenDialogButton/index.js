import React from 'react';
import noop from 'lodash/noop';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    color: 'white',
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  children: {
    width: '100%',
    height: '100%',
  },
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const FullScreenDialogButton = ({
  children,
  dialogTitle = 'Dialog',
  buttonProps,
  buttonText = 'Open Dialog',
  appBarComponents,
  handleClick = noop,
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    handleClick();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button {...buttonProps} onClick={handleClickOpen}>
        {buttonText}
      </Button>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {dialogTitle}
            </Typography>
            {appBarComponents}
          </Toolbar>
        </AppBar>
        <Box className={classes.children}>
          {children}
        </Box>
      </Dialog>
    </div>
  );
};

export default FullScreenDialogButton;
