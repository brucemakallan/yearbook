import React from 'react';
import get from 'lodash/get';
import set from 'lodash/set';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import SendIcon from '@material-ui/icons/Send';
import { sendMessage } from './queries';
import EmojiDialog from './EmojiDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const MessageTextField = ({ messagesRef, senderId, receiverId }) => {
  const classes = useStyles();
  const bottomRef = React.createRef();

  const [message, setMessage] = React.useState();

  React.useEffect(() => { // scroll to textfield on page load
    bottomRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, [bottomRef]);

  const handleChange = ({ target: { value } }) => {
    const val = {
      ...message,
    };

    set(val, 'text', value);
    setMessage(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage(messagesRef, {
      ...message,
      senderId,
      receiverId,
    });

    const val = {
      ...message,
    };
    set(val, 'text', '');
    setMessage(val);
  };

  const text = get(message, 'text', '');

  return (
    <Paper component="form" onSubmit={handleSubmit} className={classes.root} ref={bottomRef}>
      <EmojiDialog text={get(message, 'text', '')} handleChange={handleChange} />
      <TextField
        fullWidth
        // multiline
        // rows={1}
        // rowsMax={4}
        value={text}
        onChange={handleChange}
        className={classes.input}
        placeholder="Type Message"
        inputProps={{
          'aria-label': 'type message here',
        }}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        type="submit"
        color="primary"
        className={classes.iconButton}
        aria-label="send message"
        disabled={!text}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default MessageTextField;
