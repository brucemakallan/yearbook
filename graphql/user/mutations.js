import { gql } from 'apollo-boost';

import DefaultUserFragment, { AuthFragment } from './fragments';

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($signupUser: SignUpUserInput!) {
    signup(signupUser: $signupUser) {
      ...AuthFragment
    }
  }
  ${AuthFragment}
`;

export const LOGIN_MUTATION = gql`
  mutation Login($loginUser: LoginUserInput!) {
    login(loginUser: $loginUser) {
      ...AuthFragment
    }
  }
  ${AuthFragment}
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($resetPasswordParams: ResetPasswordInput!) {
    resetPassword(resetPasswordParams: $resetPasswordParams) {
      ...DefaultUserFragment
    }
  }
  ${DefaultUserFragment}
`;
