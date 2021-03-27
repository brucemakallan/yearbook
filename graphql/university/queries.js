import { gql } from 'apollo-boost';

import DefaultUniversityFragment from './fragments';

export const GET_ALL_UNIVERSITIES_QUERY = gql`
  query GetAllUniversities {
    allUniversities {
      id
      name
    }
  }
`;

export const GET_SINGLE_UNIVERSITY_QUERY = gql`
  query GetSingleUniversity($searchParams: FindUniversityInput!) {
    singleUniversity(searchParams: $searchParams) {
      ...DefaultUniversityFragment
    }
  }
  ${DefaultUniversityFragment}
`;
