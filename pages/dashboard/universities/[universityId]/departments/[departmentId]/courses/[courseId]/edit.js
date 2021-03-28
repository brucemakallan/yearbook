import React, { useEffect, useState } from 'react';
import get from 'lodash/get';
import upperCase from 'lodash/upperCase';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import Loader from '../../../../../../../../components/Loader';
import Feedback from '../../../../../../../../components/Feedback';
import PageWithSidebar from '../../../../../../../../components/DashboardComponents/PageWithSidebar';
import { GET_SINGLE_COURSE_QUERY } from '../../../../../../../../graphql/course/queries';
import CourseForm from '../../../../../../../../components/DashboardPages/Course/courseForm';
import { getCurrentDepartmentFromCache } from '../../../../../../../../helpers/cacheManagement';

const EditCourse = () => {
  const router = useRouter();
  const { universityId, departmentId, courseId } = router.query;
  const client = useApolloClient();

  const [course, setCourse] = useState();

  const getSingleCourse = useQuery(GET_SINGLE_COURSE_QUERY, {
    variables: {
      searchParams: {
        departmentId,
        courseId,
      },
    },
  });

  const currentDepartment = getCurrentDepartmentFromCache(client, universityId, departmentId);
  const currentDepartmentName = get(currentDepartment, 'name');

  useEffect(() => {
    const singleCourse = get(getSingleCourse, 'data.singleCourse');
    setCourse(singleCourse);
  }, [getSingleCourse]);

  return (
    <>
      {getSingleCourse.loading && <Loader />}
      { getSingleCourse.error && (
        <Feedback
          open={!!getSingleCourse.error}
          feedbackMessage={getSingleCourse.error}
          severity='error'
          type='error'
        />
      )}
      {course && (
        <PageWithSidebar
          title={currentDepartmentName ? upperCase(currentDepartmentName) : 'COURSE'}
        >
          {currentDepartment && (
            <CourseForm course={course} currentDepartment={currentDepartment} />
          )}
        </PageWithSidebar>
      )}
    </>
  );
};

export default EditCourse;
