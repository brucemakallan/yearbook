import React from 'react';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';

import { uploadEntities } from '../../helpers/enums';
import createWidget, { createWidgetOptions } from '../../helpers/cloudinaryUploadHelper';
import Loader from '../Loader';

const UploadFile = ({
  children,
  uploadEntity,
  text = 'Upload',
  tags,
  photoArray,
  setPhotoArray,
  crop,
  handleSave,
}) => {
  const allowMultiple = (uploadEntity !== uploadEntities.PROFILE);
  const widgetOptions = createWidgetOptions(tags, crop);

  const [loading, setLoading] = React.useState(false);

  const handleOnClose = () => {
    setLoading(false);
  };

  const handleOnUpload = (props) => {
    setLoading(false);
    handleSave(props);
  };

  const handleClick = async () => {
    setLoading(true);
    const cloudinaryWidget = await createWidget({
      widgetOptions,
      allowMultiple,
      images: photoArray,
      setImages: setPhotoArray,
      handleSave: handleOnUpload,
      handleClose: handleOnClose,
    });

    cloudinaryWidget.open();
  };

  if (loading) {
    return <Loader showInline />;
  } if (children) {
    return <div onClick={handleClick}>{children}</div>;
  }

  return (
    <Button
      color="primary"
      component="span"
      startIcon={<CloudUploadIcon />}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};

export default UploadFile;
