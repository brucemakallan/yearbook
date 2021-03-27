import { gql } from 'apollo-boost';

import DefaultProfileGalleryFragment from './fragments';

// eslint-disable-next-line import/prefer-default-export
export const UPSERT_PROFILE_GALLERIES_MUTATION = gql`
  mutation UpsertProfileGalleries($urls: [PhotoInput]!) {
    upsertProfileGalleries(urls: $urls) {
      ...DefaultProfileGalleryFragment
    }
  }
  ${DefaultProfileGalleryFragment}
`;
