import { gql } from 'apollo-boost';

import DefaultUserFragment from '../user/fragments';
import DefaultUniversityFragment from '../university/fragments';

const DefaultDepartmentFragment = gql`
  fragment DefaultDepartmentFragment on Department {
    id
    name
    university {
      ...DefaultUniversityFragment
    }
    user {
      ...DefaultUserFragment
    }
  }
  ${DefaultUserFragment}
  ${DefaultUniversityFragment}
`;

export default DefaultDepartmentFragment;
