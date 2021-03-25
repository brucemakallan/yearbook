import React from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
}));

const ImageBackdrop = ({ img, children }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div onClick={handleToggle}>
        {children}
      </div>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <img src={img} alt='gallery' className={classes.gridImage} />
      </Backdrop>
    </div>
  );
};

export default ImageBackdrop;
