import { gql } from 'apollo-boost';
import DefaultUserFragment from '../user/fragments';

const DefaultUniversityFragment = gql`
  fragment DefaultUniversityFragment on University {
    id
    name
    classification
    user {
      ...DefaultUserFragment
    }
  }
  ${DefaultUserFragment}
`;

export default DefaultUniversityFragment;
