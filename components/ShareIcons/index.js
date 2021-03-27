import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  FacebookShareButton,
  FacebookIcon,

  EmailShareButton,
  EmailIcon,

  RedditShareButton,
  RedditIcon,

  TelegramShareButton,
  TelegramIcon,

  TwitterShareButton,
  TwitterIcon,

  ViberShareButton,
  ViberIcon,

  WhatsappShareButton,
  WhatsappIcon,

  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.lightGrey,
    marginBottom: theme.spacing(2),
  },
}));

const defaultUrl = 'https://madeyear.com';
const defaultMessage = 'Hey, Checkout Yearbook.';
const defaultDescription = 'Connecting you with your friends within the same University / School.';

const ShareIcons = ({
  urlToShare = defaultUrl,
  size = 32,
  round = true,
  message = defaultMessage,
  description = defaultDescription,
}) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="body2" className={classes.heading}>Share via:</Typography>

      <div>
        <FacebookShareButton url={urlToShare} quote={description}>
          <FacebookIcon size={size} round={round} />
        </FacebookShareButton>
        <TwitterShareButton url={urlToShare} title={message}>
          <TwitterIcon size={size} round={round} />
        </TwitterShareButton>
        <RedditShareButton url={urlToShare} title={message}>
          <RedditIcon size={size} round={round} />
        </RedditShareButton>
        <TelegramShareButton url={urlToShare} title={message}>
          <TelegramIcon size={size} round={round} />
        </TelegramShareButton>
      </div>
      <div>
        <ViberShareButton url={urlToShare} title={message}>
          <ViberIcon size={size} round={round} />
        </ViberShareButton>
        <WhatsappShareButton url={urlToShare} title={message}>
          <WhatsappIcon size={size} round={round} />
        </WhatsappShareButton>
        <EmailShareButton url={urlToShare} subject={message} body={description}>
          <EmailIcon size={size} round={round} />
        </EmailShareButton>
        <LinkedinShareButton url={urlToShare} title={message} summary={description} source={urlToShare}>
          <LinkedinIcon size={size} round={round} />
        </LinkedinShareButton>
      </div>
    </>
  );
};

export default ShareIcons;
