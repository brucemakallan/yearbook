import { gql } from 'apollo-boost';

import DefaultCourseFragment from './fragments';

export const GET_ALL_COURSES_QUERY = gql`
  query GetAllCourses {
    allCourses {
      id
      name
      department {
        id
        university {
          id
        }
      }
    }
  }
`;

export const GET_SINGLE_COURSE_QUERY = gql`
  query GetSingleCourse($searchParams: FindCourseInput!) {
    singleCourse(searchParams: $searchParams) {
      ...DefaultCourseFragment
    }
  }
  ${DefaultCourseFragment}
`;

export const GET_ALL_COURSES_IN_DEPARTMENT_QUERY = gql`
  query GetAllCoursesInDepartment($departmentId: ID!) {
    allCoursesInDepartment(departmentId: $departmentId) {
      ...DefaultCourseFragment
    }
  }
  ${DefaultCourseFragment}
`;
