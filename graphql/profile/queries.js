import { gql } from 'apollo-boost';

import DefaultProfileFragment from './fragments';

export const GET_ALL_PROFILES_IN_UNIVERSITY_QUERY = gql`
  query GetAllProfilesInUniversity {
    allProfilesInUniversity {
      ...DefaultProfileFragment
    }
  }
  ${DefaultProfileFragment}
`;

export const GET_ALL_PROFILES_IN_COURSE_QUERY = gql`
  query GetAllProfilesInCourse {
    allProfilesInCourse {
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
