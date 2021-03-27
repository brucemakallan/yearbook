import { createMuiTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import Ralewayttf from './fonts/raleway/Raleway-Regular.ttf';

export const images = {
  logo: 'https://res.cloudinary.com/yearbook2020/image/upload/v1604235963/yearbook-assets/rf1wyrmsidl1bej6tzog.png',
  favicon: '/favicon.ico',
  boyOnPadlock: 'https://res.cloudinary.com/yearbook2020/image/upload/v1604235965/yearbook-assets/rfupnk0ojoisguutrqwc.png', // Login bg
  meditation: 'https://res.cloudinary.com/yearbook2020/image/upload/v1604235964/yearbook-assets/arbws51ysolglzdv0hk0.jpg', // 404 image
  anonymous: 'https://res.cloudinary.com/yearbook2020/image/upload/v1604235963/yearbook-assets/pomrz7a47yxzyblxkdea.png',
};

export const sounds = {
  bubblePop: '/assets/sounds/pop.wav',
};

export const svgs = {
  vectorStats: '/assets/svgs/vector-stats.svg',
};

export const fonts = {
  raleway: {
    fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
      local('Raleway'),
      local('Raleway-Regular'),
      url(${Ralewayttf}) format('ttf')
    `,
    // eslint-disable-next-line max-len
    unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
  },
};

export const animations = {
  '@keyframes leftToRightAnimation': {
    '0%': {
      transform: 'translate(0, 0)',
    },
    '100%': {
      transform: 'translate(100%, 0)',
    },
  },
  '@keyframes rightToLeftAnimation': {
    '0%': {
      transform: 'translate(100%, 0)',
    },
    '100%': {
      transform: 'translate(0, 0)',
    },
  },
};

export const colors = {
  primary: { // blue-ish
    light: '#D5EBFF',
    main: '#5793CF',
    dark: '#183D7B',
  },
  secondary: { // pink-ish
    light: '#b21365',
    main: '#FF2C9B',
    dark: '#d177d5',
  },
  accent: { // cream-ish
    light: '#fcdbd1',
    main: '#FFC3B0',
    dark: '#EA9D92',
  },
  status: {
    error: 'red',
    warning: 'orange',
    success: 'green',
  },
  light: 'white',
  dark: grey[400],
  darkGrey: grey[600],
  lightGrey: '#EEEEEE',
  deepBlue: '#041E42',
  profileBlue: '#E6E9F3',
  profilePink: '#FFEAED',
  facebookBlue: '#3B5998',
  purpleHighlight: '#CE78D5',
};

const globalTheme = createMuiTheme({
  palette: {
    ...colors,
  },
  typography: {
    primaryColor: grey[800],
    fontSize: 16,
    htmlFontSize: 16,
    fontFamily: [
      'raleway',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
    ],
    h1: {
      fontSize: '2.3rem',
      fontWeight: 300,
      color: grey[700],
    },
    h2: {
      fontSize: '2rem',
      color: grey[700],
    },
    h3: {
      fontSize: '1.8rem',
      color: grey[700],
    },
    h4: {
      fontSize: '1.5rem',
      color: grey[700],
    },
    h5: {
      fontSize: '1.3rem',
      fontWeight: 500,
      color: grey[700],
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: grey[700],
    },
    subtitle1: {
      color: grey[700],
    },
    subtitle2: {
      color: grey[700],
    },
    body1: {
      fontSize: '16px',
      color: grey[600],
      '& strong': {
        color: grey[600],
      },
    },
    body2: {
      fontSize: '14px',
      color: grey[600],
      '& strong': {
        color: grey[600],
      },
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        margin: '10px 0',
        textAlign: 'center',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        backgroundSize: '100% auto',
        // eslint-disable-next-line max-len
        backgroundImage: `linear-gradient(to right, ${colors.secondary.dark} 0%, ${colors.secondary.main} 51%, ${colors.accent.main} 100%)`,
      },
    },
  },
});

export const MUIDatatableTheme = createMuiTheme({
  overrides: {
    MuiGridList: {
      root: {
        display: 'block',
      },
    },
    MuiGridListTile: {
      root: {
        width: '100% !important',
      },
    },
  },
});

export default globalTheme;
