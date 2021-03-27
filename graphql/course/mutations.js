import { gql } from 'apollo-boost';

import DefaultCourseFragment from './fragments';

export const CREATE_COURSE_MUTATION = gql`
  mutation CreateCourse($course: CourseInput!) {
    createCourse(course: $course) {
      ...DefaultCourseFragment
    }
  }
  ${DefaultCourseFragment}
`;

export const UPDATE_COURSE_MUTATION = gql`
  mutation UpdateCourse($courseUpdates: CourseUpdateInput!) {
    updateCourse(updateParams: $courseUpdates) {
      ...DefaultCourseFragment
    }
  }
  ${DefaultCourseFragment}
`;

export const DELETE_COURSE_MUTATION = gql`
  mutation DeleteCourse($courseId: String!) {
    deleteCourse(courseId: $courseId) {
      ...DefaultCourseFragment
    }
  }
  ${DefaultCourseFragment}
`;
