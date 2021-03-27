import { gql } from 'apollo-boost';

import DefaultDepartmentFragment from './fragments';

export const GET_ALL_DEPARTMENTS_QUERY = gql`
  query GetAllDepartments {
    allDepartments {
      id
      name
      university {
        id
      }
    }
  }
`;

export const GET_SINGLE_DEPARTMENT_QUERY = gql`
  query GetSingleDepartment($searchParams: FindDepartmentInput!) {
    singleDepartment(searchParams: $searchParams) {
      ...DefaultDepartmentFragment
    }
  }
  ${DefaultDepartmentFragment}
`;

export const GET_ALL_DEPARTMENTS_IN_UNIVERSITY_QUERY = gql`
  query GetAllDepartmentsInUniversity($universityId: ID!) {
    allDepartmentsInUniversity(universityId: $universityId) {
      ...DefaultDepartmentFragment
    }
  }
  ${DefaultDepartmentFragment}
`;
