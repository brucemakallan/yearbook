import React from 'react';

import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import PhotoGrid from '../../PhotoGrid';

const createResponsiveTiles = ({ galleryImages, gallery }) => {
  let cols = [3];
  if (gallery) cols = [1];
  else if (galleryImages.length === 2) cols = [1, 2];
  else if (galleryImages.length === 3) cols = [1, 1, 1];
  else if (galleryImages.length === 4) cols = [1, 2, 2, 1];
  else if (galleryImages.length === 5) cols = [1, 2, 1, 1, 1];

  return galleryImages.map(({ url, checked }, idx) => ({
    img: url,
    cols: cols[idx],
    checked,
  }));
};

const GallerySection = ({
  classes,
  showPreview,
  images,
  handleChange,
  isGallery,
  galleryOwner,
  goToGallery,
}) => (
  <div className={classes.photoGrid}>
    {(images && images.length > 0)
      ? (
        <PhotoGrid
          isPreview={showPreview}
          handleChange={handleChange}
          galleryOwner={galleryOwner}
          goToGallery={goToGallery}
          isGallery={isGallery}
          tileData={
            showPreview
              ? createResponsiveTiles({
                galleryImages: images.slice(0, 5),
              })
              : createResponsiveTiles({
                galleryImages: images, gallery: isGallery,
              })
          }
        />
      )
      : (
        <Box m={2}>
          <Grid container spacing={2}>
            <Grid item>
              <ImageSearchIcon />
            </Grid>
            <Grid item>
              <Typography variant="overline">NO IMAGES FOUND IN THIS GALLERY</Typography>
            </Grid>
          </Grid>
        </Box>
      )
    }
  </div>
);

export default GallerySection;
