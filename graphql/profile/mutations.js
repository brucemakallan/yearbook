import { gql } from 'apollo-boost';

import DefaultProfileFragment from './fragments';

export const CREATE_PROFILE_MUTATION = gql`
  mutation CreateProfile($profile: ProfileInput!) {
    createProfile(profile: $profile) {
      ...DefaultProfileFragment
    }
  }
  ${DefaultProfileFragment}
`;

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($profile: ProfileInput!) {
    updateProfile(profile: $profile) {
      ...DefaultProfileFragment
    }
  }
  ${DefaultProfileFragment}
`;

export const DELETE_PROFILE_MUTATION = gql`
  mutation DeleteCurrentProfile {
    deleteProfile {
      ...DefaultProfileFragment
    }
  }
  ${DefaultProfileFragment}
`;
