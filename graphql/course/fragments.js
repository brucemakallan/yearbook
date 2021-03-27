import { gql } from 'apollo-boost';

import DefaultUserFragment from '../user/fragments';
import DefaultDepartmentFragment from '../department/fragments';

const DefaultCourseFragment = gql`
  fragment DefaultCourseFragment on Course {
    id
    name
    department {
      ...DefaultDepartmentFragment
    }
    user {
      ...DefaultUserFragment
    }
  }
  ${DefaultUserFragment}
  ${DefaultDepartmentFragment}
`;

export default DefaultCourseFragment;
