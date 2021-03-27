import { gql } from 'apollo-boost';

import DefaultDepartmentFragment from './fragments';

export const CREATE_DEPARTMENT_MUTATION = gql`
  mutation CreateDepartment($department: DepartmentInput!) {
    createDepartment(department: $department) {
      ...DefaultDepartmentFragment
    }
  }
  ${DefaultDepartmentFragment}
`;

export const UPDATE_DEPARTMENT_MUTATION = gql`
  mutation UpdateDepartment($departmentUpdates: DepartmentUpdateInput!) {
    updateDepartment(updateParams: $departmentUpdates) {
      ...DefaultDepartmentFragment
    }
  }
  ${DefaultDepartmentFragment}
`;

export const DELETE_DEPARTMENT_MUTATION = gql`
  mutation DeleteDepartment($departmentId: String!) {
    deleteDepartment(departmentId: $departmentId) {
      ...DefaultDepartmentFragment
    }
  }
  ${DefaultDepartmentFragment}
`;
