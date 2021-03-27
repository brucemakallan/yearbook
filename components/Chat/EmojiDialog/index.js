import React from 'react';
import Picker from 'emoji-picker-react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import MoodIcon from '@material-ui/icons/Mood';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: theme.spacing(1),
  },
  smallIcon: {
    fontSize: theme.spacing(2),
  },
}));

const EmojiDialog = ({ text, handleChange }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => setOpen(!open);

  const onEmojiClick = (_e, chosenEmoji) => {
    const event = {
      target: {
        value: `${text}${chosenEmoji.emoji}`,
      },
    };
    handleChange(event);
  };

  return (
    <div>
      <IconButton className={classes.iconButton} onClick={toggleOpen} aria-label="show emojis">
        <MoodIcon color="primary" />
      </IconButton>

      <Dialog onClose={toggleOpen} aria-labelledby="emoji-dialog" open={open}>
        <DialogTitle id="emoji-dialog">
          <Grid container spacing={2} justify="space-between" alignItems="center">
            <Grid item>Emojis</Grid>
            <Grid item>
              <IconButton className={classes.iconButton} onClick={toggleOpen} aria-label="close dialog">
                <CloseIcon color="secondary" className={classes.smallIcon} />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <Picker onEmojiClick={onEmojiClick} />
      </Dialog>
    </div>
  );
};

export default EmojiDialog;
