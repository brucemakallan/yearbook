import { gql } from 'apollo-boost';

import DefaultUserFragment, { ResetPasswordFragment } from './fragments';

// eslint-disable-next-line import/prefer-default-export
export const GET_ALL_USERS_QUERY = gql`
  query GetAllUsers {
    allUsers {
      ...DefaultUserFragment
    }
  }
  ${DefaultUserFragment}
`;

export const GET_SINGLE_USER_QUERY = gql`
  query GetSingleUser($searchParams: FindUserInput!) {
    singleUser(searchParams: $searchParams) {
      ...DefaultUserFragment
    }
  }
  ${DefaultUserFragment}
`;

export const PASSWORD_RESET_LINK_QUERY = gql`
  query SendPasswordResetLink($email: String!) {
    sendPasswordResetLink(email: $email) {
      ...ResetPasswordFragment
    }
  }
  ${ResetPasswordFragment}
`;
