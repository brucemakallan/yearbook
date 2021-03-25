import React from 'react';

import FacebookIcon from '@material-ui/icons/Facebook';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

const PersonalSection = ({ classes, singleProfile }) => (
  <div className={classes.personalSection}>
    <div className={classes.personalSection_back}>
      <div className={classes.back_primary} />
      <div className={classes.back_secondary} />
    </div>
    <div className={classes.personalSection_front}>
      <div className={classes.front_personalDetails}>
        <Typography gutterBottom variant="h1">
          {`${singleProfile.user.firstName} ${singleProfile.user.lastName}`}
        </Typography>
        <Typography gutterBottom variant="h4" color="primary">
          {singleProfile.registrationNumber}
        </Typography>
        <Typography gutterBottom variant="body2" align="justify" className={classes.personalDetails_bio}>
          {singleProfile.bio}
        </Typography>
        <Typography gutterBottom variant="overline">
          {`Year of entry: ${singleProfile.year}`}
        </Typography>
      </div>
      <div className={classes.front_dp}>
        <Avatar
          alt="Display Picture"
          src={singleProfile.displayPicture}
          className={classes.dp_avatar}
        />
        <div className={classes.dp_links}>
          {singleProfile.facebook && (
            <Tooltip title="Facebook" arrow>
              <Link
                target="_blank"
                href={singleProfile.facebook}
              >
                <FacebookIcon className={classes.links_facbookIcon} />
              </Link>
            </Tooltip>
          )}
          {singleProfile.phoneNumber && (
            <Tooltip title="Call" arrow>
              <Link
                color="secondary"
                target="_blank"
                href={`tel:${singleProfile.phoneNumber}`}
              >
                <PhoneIcon />
              </Link>
            </Tooltip>
          )}
          <Tooltip title="Send Email" arrow>
            <Link
              color="secondary"
              target="_blank"
              href={`mailto:${singleProfile.user.email}`}
            >
              <MailIcon />
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  </div>
);

export default PersonalSection;
