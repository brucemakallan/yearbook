import React, { useEffect, useState } from 'react';
import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';

import { useRouter } from 'next/router';
import { GET_SINGLE_UNIVERSITY_QUERY } from '../../../../graphql/university/queries';
import Loader from '../../../../components/Loader';
import Feedback from '../../../../components/Feedback';
import PageWithSidebar from '../../../../components/DashboardComponents/PageWithSidebar';
import UniversityForm from '../../../../components/DashboardPages/University/universityForm';

const EditUniversity = () => {
  const router = useRouter();
  const { universityId } = router.query;

  const [university, setUniversity] = useState();

  const getSingleUniversity = useQuery(GET_SINGLE_UNIVERSITY_QUERY, {
    variables: {
      searchParams: {
        id: universityId,
      },
    },
  });

  useEffect(() => {
    const singleUniversity = get(getSingleUniversity, 'data.singleUniversity');
    setUniversity(singleUniversity);
  }, [getSingleUniversity]);

  const handleOnCompleted = () => {
    router.back();
  };

  return (
    <>
      {getSingleUniversity.loading && <Loader />}
      {getSingleUniversity.error && (
        <Feedback
          open={!!getSingleUniversity.error}
          feedbackMessage={getSingleUniversity.error}
          severity='error'
          type='error'
        />
      )}
      {university && (
        <PageWithSidebar title={university.name}>
          <UniversityForm university={university} handleOnCompleted={handleOnCompleted} />
        </PageWithSidebar>
      )}
    </>
  );
};

export default EditUniversity;
