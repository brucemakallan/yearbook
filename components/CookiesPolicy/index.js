import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
}));

const CookiesPolicy = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="overline" gutterBottom>Last Updated: September 13th, 2020</Typography>

      <Typography variant="body1" gutterBottom>
        This Cookie Policy explains how we use cookies and similar technologies to recognize
        you when you visit our website
        at <Link target="_blank" rel="noopener" href="https://madeyear.com">https://madeyear.com</Link> It
        explains what these technologies are and why we use them, as well as your rights
        to control our use of them.
        In some cases we may use cookies to collect personal information, or that becomes personal
        information if we combine it with other information.
      </Typography>

      <Typography variant="h1" gutterBottom>What are cookies?</Typography>
      <Typography variant="body1" gutterBottom>
        Cookies are small pieces of text used to store information on web browsers.
        Cookies are used to store and receive identifiers and other information on computers,
        phones and other devices.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Cookies set by parties other than the website owner are called "third party cookies".
        Third party cookies enable third party features or functionality to be provided on
        or through the website (e.g. like advertising, interactive content and analytics).
        The parties that set these third party cookies can recognize your computer both when
        it visits the website in question and also when it visits certain other websites.
      </Typography>

      <Typography variant="h1" className={classes.heading}>Why do we use cookies?</Typography>
      <Typography variant="body1" gutterBottom>
        We use first and third party cookies for several reasons. Some cookies are required for technical
        reasons in order for our Websites to operate, and we refer to these as "essential" or
        "strictly necessary" cookies. Other cookies also enable us to track and target the
        interests of our users to enhance the experience on our Online Properties.
        Third parties serve cookies through our Websites for advertising, analytics and other purposes.
        This is described in more detail below.
      </Typography>
      <Typography variant="body1">
        The specific types of first and third party cookies served through our Websites and the purposes
        they perform are described below
        (please note that the specific cookies served may vary depending on the specific
        Online Properties you visit):
      </Typography>

      <Typography variant="h1" className={classes.heading}>How can I control cookies?</Typography>
      <Typography variant="body1" gutterBottom>
        You have the right to decide whether to accept or reject cookies.
        Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
        In addition, most advertising networks offer you a way to opt out of targeted advertising.
        If you would like to find out more information, please
        visit <Link target="_blank" rel="noopener" href="http://www.aboutads.info/choices">http://www.aboutads.info/choices</Link>
        , <Link target="_blank" rel="noopener" href="http://www.youronlinechoices.com">http://www.youronlinechoices.com</Link>.
      </Typography>

      <Typography variant="h1" className={classes.heading}>Do you serve targeted advertising?</Typography>
      <Typography variant="body1" gutterBottom>
        Third parties may serve cookies on your computer or mobile device to serve advertising through
        our Websites. These companies may use information about your visits to this and other websites
        in order to provide relevant advertisements about goods and services that you may be interested in.
        They may also employ technology that is used to measure the effectiveness of advertisements.
        This can be accomplished by them using cookies or web beacons to collect information about your
        visits to this and other sites in order to provide relevant advertisements about goods and
        services of potential interest to you.
      </Typography>
      <Typography variant="h6">
        The information collected through this process does NOT enable us or them to identify your name,
        contact details or other details that directly identify you unless you choose to provide these.
      </Typography>

      <Typography variant="h1" className={classes.heading}>
        How often will you update this Cookie Policy?
      </Typography>
      <Typography variant="body1" gutterBottom>
        We may update this Cookie Policy from time to time in order to reflect, for example,
        changes to the cookies we use or for other operational, legal or regulatory reasons.
        Please therefore re-visit this Cookie Policy regularly to stay informed about our use
        of cookies and related technologies.
      </Typography>

      <Typography variant="h1" className={classes.heading}>Where can I get further information?</Typography>
      <Typography variant="body1" gutterBottom>
        If you have any questions about our use of cookies or other technologies, please email us
        at <Link target="_blank" rel="noopener" href="mailto:support@madeyear.com">support@madeyear.com</Link>
      </Typography>
    </div>
  );
};

export default CookiesPolicy;
