import { gql } from 'apollo-boost';

import DefaultUserFragment from '../user/fragments';
import DefaultCourseFragment from '../course/fragments';

const DefaultProfileFragment = gql`
  fragment DefaultProfileFragment on Profile {
    id
    displayPicture
    registrationNumber
    phoneNumber
    bio
    facebook
    year
    course {
      ...DefaultCourseFragment
    }
    user {
      ...DefaultUserFragment
    }
  }
  ${DefaultUserFragment}
  ${DefaultCourseFragment}
`;

export default DefaultProfileFragment;
