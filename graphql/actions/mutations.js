import { gql } from 'apollo-boost';

// eslint-disable-next-line import/prefer-default-export
export const SEND_EMAIL = gql`
  mutation SendEmail($emailParams: EmailParamsInput!) {
    sendEmail(emailParams: $emailParams) {
      isSent
    }
  }
`;
