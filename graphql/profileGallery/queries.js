import { gql } from 'apollo-boost';

import DefaultProfileGalleryFragment from './fragments';

export const ALL_PROFILE_GALLERIES_QUERY = gql`
  query AllProfileGalleries {
    allProfileGalleries {
      ...DefaultProfileGalleryFragment
    }
  }
  ${DefaultProfileGalleryFragment}
`;

export const SINGLE_PROFILE_GALLERY_QUERY = gql`
  query SingleProfileGallery($profileId: ID!) {
    singleProfileGallery(profileId: $profileId) {
      ...DefaultProfileGalleryFragment
    }
  }
  ${DefaultProfileGalleryFragment}
`;
