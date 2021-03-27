import { gql } from 'apollo-boost';

import DefaultProfileFragment from '../profile/fragments';

const DefaultProfileGalleryFragment = gql`
  fragment DefaultProfileGalleryFragment on ProfileGallery {
    id
    urls {
      id
      url
    }
    profile {
      ...DefaultProfileFragment
    }
  }
  ${DefaultProfileFragment}
`;

export default DefaultProfileGalleryFragment;
