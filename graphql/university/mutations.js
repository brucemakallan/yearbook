import { gql } from 'apollo-boost';

import DefaultUniversityFragment from './fragments';

export const CREATE_UNIVERSITY_MUTATION = gql`
  mutation CreateUniversity($universityName: String!) {
    createUniversity(name: $universityName) {
      ...DefaultUniversityFragment
    }
  }
  ${DefaultUniversityFragment}
`;

export const UPDATE_UNIVERSITY_MUTATION = gql`
  mutation UpdateUniversity($universityUpdates: UniversityUpdateInput!) {
    updateUniversity(updateParams: $universityUpdates) {
      ...DefaultUniversityFragment
    }
  }
  ${DefaultUniversityFragment}
`;

export const DELETE_UNIVERSITY_MUTATION = gql`
  mutation DeleteUniversity($universityId: String!) {
    deleteUniversity(universityId: $universityId) {
      ...DefaultUniversityFragment
    }
  }
  ${DefaultUniversityFragment}
`;
