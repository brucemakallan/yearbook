import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';

import AlertDialog from '../AlertDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.primary.dark,
  },
  title: {
    marginRight: theme.spacing(1.5),
  },
  dividerColor: {
    background: theme.palette.accent.dark,
  },
}));

const ContextAppBar = ({ selectedItems, handleDeleteChecked }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" className={classes.title}>
            {`${selectedItems.length} Selected`}
          </Typography>
          <Divider orientation="vertical" flexItem className={classes.dividerColor}/>
          <AlertDialog
            title="Are you sure you want to delete?"
            handleYes={handleDeleteChecked}
            buttonText="Delete"
            buttonProps={{
              size: 'small',
              color: 'secondary',
              startIcon: <DeleteIcon />,
            }}
          >
            <Typography variant="body2">
              Are you sure you want to delete these Images? This action cannot be undone.
            </Typography>
          </AlertDialog>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ContextAppBar;
