import { makeStyles } from '@material-ui/core/styles';

const profileHeight = 385;
const profileWidth = 566;
const border = (theme) => `3px solid ${theme.palette.primary.light}`;

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: profileWidth,
  },
  cardContents: {
    width: '100%',
  },
  sectionTitle: {
    padding: theme.spacing(2),
  },

  // PROFILE SECTION
  // personal details
  personalSection: {
    position: 'relative',
    minHeight: profileHeight,
    [theme.breakpoints.down('sm')]: {
      minHeight: profileHeight + 200,
      padding: theme.spacing(2, 0),
    },
  },
  // background
  personalSection_back: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'stretch',
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },
  back_primary: {
    margin: '0 auto',
    width: '22%',
    backgroundColor: theme.palette.profileBlue,
  },
  back_secondary: {
    width: '22%',
    backgroundColor: theme.palette.profilePink,
  },
  // foreground
  personalSection_front: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      alignItems: 'center',
      textAlign: 'center',
    },
  },
  // personal details
  front_personalDetails: {
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
  },
  personalDetails_bio: {
    maxHeight: 180,
    overflow: 'scroll',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  // display picture
  front_dp: {
    textAlign: 'center',
  },
  dp_avatar: {
    margin: 'auto',
    width: theme.spacing(22),
    height: theme.spacing(22),
    backgroundColor: 'white',
  },
  dp_links: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-around',
  },
  links_facbookIcon: {
    color: theme.palette.facebookBlue,
  },

  // COURSE SECTION
  courseSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTop: border(theme),
    borderBottom: border(theme),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up('md')]: {
      alignItems: 'stretch',
    },
  },
  infoBox: {
    width: '33%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexDirection: 'column',
    },

    '&:nth-child(2)': {
      [theme.breakpoints.down('sm')]: {
        borderTop: border(theme),
        borderBottom: border(theme),
      },
      [theme.breakpoints.up('md')]: {
        borderLeft: border(theme),
        borderRight: border(theme),
      },
    },
  },
}));

export default useStyles;
