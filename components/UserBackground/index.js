import React from 'react';
import clsx from 'clsx';

import Hidden from '@material-ui/core/Hidden';

import useStyles from './styles';
import { colors, images } from '../../styles/global-theme';
import CurvesBackground from '../../styles/curvesBackground';

const UserBackground = ({ hidden }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CurvesBackground />
      <Hidden mdDown>
        <svg height={400} width={400} className={clsx(classes.circle1Svg, classes.flipHorizontal)}>
          <circle cy={200} r={200} fill={colors.primary.main} />
        </svg>

        <svg height={200} width={200} className={classes.circle2Svg}>
          <circle cy={100} cx={100} r={100} fill={colors.accent.main} />
        </svg>

        <svg height={50} width={50} className={classes.circle3Svg}>
          <circle cy={25} cx={25} r={25} fill={colors.primary.main} />
        </svg>

        <img
          src={images.boyOnPadlock}
          alt="Login / Signup"
          className={classes.imgLoginVector}
          hidden={hidden}
        />
      </Hidden>
    </div>
  );
};
export default UserBackground;
