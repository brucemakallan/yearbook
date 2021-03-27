import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { colors } from './global-theme';

const useStyles = makeStyles((theme) => ({
  curveSvg: {
    position: 'absolute',
    top: '0',
    right: '0',
    opacity: '0.8',
    zIndex: -1,
  },
  flipHorizontal: {
    transform: 'scaleX(-1)',
  },
}));

const CurvesBackground = () => {
  const classes = useStyles();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      className={clsx(classes.curveSvg, classes.flipHorizontal)}
    >
      <defs>
        <linearGradient id="gradient">
          <stop offset="0%" stopColor={colors.secondary.main} />
          <stop offset="100%" stopColor={colors.secondary.dark} />
        </linearGradient>
      </defs>
      <path
        fill="url(#gradient)"
        // eslint-disable-next-line max-len
        d="M0,288L48,245.3C96,203,192,117,288,90.7C384,64,480,96,576,117.3C672,139,768,149,864,149.3C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
      </path>
    </svg>
  );
};

export default CurvesBackground;
