import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
}));

export default useStyles;
