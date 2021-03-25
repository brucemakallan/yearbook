import { gql } from 'apollo-boost';

import DefaultProfileFragment from './fragments';

export const GET_ALL_PROFILES_QUERY = gql`
  query GetAllProfiles {
    allProfilesInUniversity {
      ...DefaultProfileFragment
    }
  }
  ${DefaultProfileFragment}
`;

export const GET_SINGLE_PROFILE_QUERY = gql`
  query GetSingleProfile($searchParams: FindProfileInput!) {
    singleProfile(searchParams: $searchParams) {
      ...DefaultProfileFragment
    }
  }
  ${DefaultProfileFragment}
`;
