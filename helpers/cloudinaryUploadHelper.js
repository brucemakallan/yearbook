import { Util } from 'cloudinary-core';

// Widget Options: https://cloudinary.com/documentation/upload_widget_reference
export const createWidgetOptions = (tags, crop) => ({
  tags,
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  folder: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER,
  uploadPreset: crop
    ? process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
    : process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_UNCHANGED,
});

const createWidget = async ({
  widgetOptions,
  allowMultiple,
  images,
  setImages,
  handleSave,
  handleClose,
}) => {
  const multipleUploads = [];
  let newPhotoArray;
  const scOptions = Util.withSnakeCaseKeys(widgetOptions);

  if (typeof window !== 'undefined') {
    const widget = await window.cloudinary.createUploadWidget(scOptions, (error, photos) => {
      try {
        // Events: display-changed, source-changed, abort, close, success
        if (photos.event === 'close') {
          handleClose();
        }
        if (photos.event === 'success') {
          const cloudinaryId = photos.info.public_id.split('/')[1];

          if (allowMultiple === true) {
            multipleUploads.push({
              url: photos.info.secure_url,
            });
            newPhotoArray = [...images, ...multipleUploads];
          } else {
            newPhotoArray = [{
              id: cloudinaryId,
              url: photos.info.secure_url,
            }];
          }

          setImages(newPhotoArray);
          handleSave(newPhotoArray);
        }
      } catch (err) {
        return error;
      }
    });

    return widget;
  }
};

export default createWidget;
