import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 0,
    width: '100vw',
    height: '100vh',
    position: 'relative',
  },
  flipHorizontal: {
    transform: 'scaleX(-1)',
  },
  imgLoginVector: {
    position: 'absolute',
    bottom: 100,
    left: '0',
    maxWidth: '100%',
    maxHeight: '50vh',
    margin: '20px',
  },
  circle1Svg: {
    position: 'absolute',
    top: '15%',
    right: '0',
    zIndex: '-1',
    opacity: '0.8',
  },
  circle2Svg: {
    position: 'absolute',
    top: '40%',
    right: '130px',
    zIndex: '-2',
  },
  circle3Svg: {
    position: 'absolute',
    top: '80%',
    right: '15%',
  },
}));

export default useStyles;
