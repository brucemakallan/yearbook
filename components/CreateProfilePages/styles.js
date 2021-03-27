import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: '100%',
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
  },
  form: {
    width: '100%',
  },
  buttons: {
    marginTop: theme.spacing(4),
  },
}));

export default useStyles;
