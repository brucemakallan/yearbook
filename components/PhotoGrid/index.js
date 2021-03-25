import React from 'react';
import noop from 'lodash/noop';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ImageBackdrop from '../ImageBackdrop';
import ColoredCheckbox from '../WhiteCheckbox';

// titleData Format
// const tileData = [
//   {
//     img: url,
//     title: 'Description',
//     cols: 2,
//   },
// ];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    maxWidth: 600,
  },
  icon: {
    visibility: 'hidden',

    [theme.breakpoints.only('xs')]: {
      visibility: 'visible',
    },
  },
  gridTile: {
    '&:hover': {
      '& $icon': {
        visibility: 'visible',
      },
    },
  },
  gridImage: {
    width: 200,
    height: 200,
    objectFit: 'cover',
  },
  iconDisplay: {
    visibility: 'visible',
  },
  tileVisibility: {
    visibility: 'hidden',
  },
}));

const PhotoGrid = ({
  tileData,
  handleChange,
  isPreview,
  galleryOwner,
  goToGallery,
  isGallery,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  const isMobileGalleryView = isGallery && isXs;

  const renderImage = (tile) => (
    <img
      src={tile.img}
      alt={tile.title || 'Gallery Image'}
      className={isGallery ? classes.gridImage : ''}
    />
  );

  let cols = 3;
  const numColumsMobile = tileData.length < 2 ? tileData.length : 2;
  const numColumsDesktop = tileData.length < 3 ? tileData.length : 3;

  if (isGallery) {
    cols = isMobileGalleryView ? numColumsMobile : numColumsDesktop;
  }

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={150}
        cols={cols}
        className={classes.gridList}
      >
        {tileData.map((tile) => (
          <GridListTile
            key={tile.img}
            cols={tile.cols || 1}
            className={classes.gridTile}
            onClick={isGallery ? noop : goToGallery}
          >
            {isGallery ? (
              <ImageBackdrop key={tile.img} img={tile.img}>
                {renderImage(tile)}
              </ImageBackdrop>
            ) : (
              renderImage(tile)
            )}
            {!isPreview && galleryOwner && (
              <GridListTileBar
                className={classes.tileVisibility}
                actionIcon={(
                  <ColoredCheckbox
                    size='small'
                    className={tile.checked ? classes.iconDisplay : classes.icon}
                    onChange={handleChange(tile)}
                  />
                )}
              />
            )}
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default PhotoGrid;
