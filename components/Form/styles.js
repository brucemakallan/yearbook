import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  inputFields: {
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.light,
  },
  error: {
    color: theme.palette.status.error,
  },
}));

export default useStyles;
