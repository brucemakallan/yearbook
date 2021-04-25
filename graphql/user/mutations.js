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

export const O_AUTH_LOGIN_MUTATION = gql`
  mutation OAuthLogin($loginUser: AuthLoginUserInput!) {
    oAuthLogin(loginUser: $loginUser) {
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

export const DEACTIVATE_USER_MUTATION = gql`
  mutation DeleteUserMutation {
    deleteUser {
      ...DefaultUserFragment
    }
  }
  ${DefaultUserFragment}
`;
