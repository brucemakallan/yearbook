/* eslint-disable max-len */
import { makeStyles } from '@material-ui/core/styles';

import { animations } from '../../styles/global-theme';

const SIDEBAR_WIDTH = 260;

const useStyles = makeStyles((theme) => ({
  ...animations,

  root: {
    margin: 0,
    padding: 0,
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      width: '100vw',
      height: '100vh',
      position: 'relative',
    },
  },

  // SIDEBAR
  sidebar: {
    backgroundImage: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, #5c0067 100%)`,
    width: SIDEBAR_WIDTH,
    minHeight: '100vh',

    [theme.breakpoints.only('lg')]: {
      width: '18%',
    },
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      top: 0,
      left: SIDEBAR_WIDTH * -1,
      opacity: '0.85',
      zIndex: 101,
    },
  },
  footer: {
    padding: theme.spacing(2),
    '& a': {
      color: 'white',
    },
  },
  showSideBar: {
    animation: `$leftToRightAnimation 0.5s forwards 0s ${theme.transitions.easing.easeInOut}`,
  },
  hideSideBar: {
    animation: `$rightToLeftAnimation 0.5s forwards 0s ${theme.transitions.easing.easeInOut}`,
  },
  swipeable: {
    width: '100%',
    minHeight: '100vh',
  },

  // PAGE (with header and content)
  page: {
    flexGrow: 1,
    backgroundColor: theme.palette.lightGrey,
    minHeight: '100vh',
    [theme.breakpoints.only('lg')]: {
      width: '82%',
    },
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
    },
  },
  header: {
    backgroundSize: '100% auto',
    backgroundImage: `linear-gradient(to right, ${theme.palette.secondary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  },
  burgerMenu: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  content: {
    padding: theme.spacing(2),
  },
  toolbar: {
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(2),
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

export default useStyles;
