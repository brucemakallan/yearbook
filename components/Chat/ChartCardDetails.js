import React from 'react';
import get from 'lodash/get';
import startCase from 'lodash/startCase';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import HistoryIcon from '@material-ui/icons/History';
import Typography from '@material-ui/core/Typography';

import Loader from '../Loader';
import InlineMessage from '../InlineMessage';

const useStyles = makeStyles((theme) => ({
  smallIcon: {
    fontSize: theme.spacing(2),
    marginBottom: theme.spacing(-0.25),
  },
}));

// Contains name, latest message, and last message date (for a specific chat)
const ChartCardDetails = ({
  loading,
  error,
  name,
  latestMessage,
  lastReadDate,
}) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant="body1" color="primary">{name}</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant="body2">
          {get(latestMessage, 'text')}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        {loading && <Loader showInline />}
        {!!error && (
          <InlineMessage type="warning" message="Couldn't load messages. Click to refresh page" />
        )}
        {lastReadDate && (
          <Typography variant="body2">
            <HistoryIcon className={classes.smallIcon} />
            {startCase(lastReadDate)}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default ChartCardDetails;
