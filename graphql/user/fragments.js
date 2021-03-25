import { gql } from 'apollo-boost';

const DefaultUserFragment = gql`
  fragment DefaultUserFragment on User {
    id
    firstName
    lastName
    email
    password
  }
`;

export const AuthFragment = gql`
  fragment AuthFragment on AuthPayload {
    user {
      ...DefaultUserFragment
    }
    token
  }
  ${DefaultUserFragment}
`;

export const ResetPasswordFragment = gql`
  fragment ResetPasswordFragment on ResetPasswordResponse {
    isSent
    user {
      ...DefaultUserFragment
    }
    token
  }
  ${DefaultUserFragment}
`;

export default DefaultUserFragment;
