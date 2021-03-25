import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 0,
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
  },
  backgroundLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    minHeight: '100vh',
  },
  foregroundLayer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    minHeight: '100vh',
  },
}));

export default useStyles;
