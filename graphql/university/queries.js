import { gql } from 'apollo-boost';

import DefaultUniversityFragment from './fragments';

export const GET_ALL_UNIVERSITIES_QUERY = gql`
  query GetAllUniversities {
    allUniversities {
      id
      name
      classification
      user {
        id
      }
    }
  }
`;

export const GET_INSTITUTIONS_BY_CLASSIFICATION_QUERY = gql`
  query GetInstitutionsByClassification($classification: Int!) {
    institutionsByClassification(classification: $classification) {
      ...DefaultUniversityFragment
    }
  }
  ${DefaultUniversityFragment}
`;

export const GET_SINGLE_UNIVERSITY_QUERY = gql`
  query GetSingleUniversity($searchParams: FindUniversityInput!) {
    singleUniversity(searchParams: $searchParams) {
      ...DefaultUniversityFragment
    }
  }
  ${DefaultUniversityFragment}
`;
