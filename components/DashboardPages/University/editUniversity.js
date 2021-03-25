import React, { useEffect, useState } from 'react';
import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';

import { useRouter } from 'next/router';
import { GET_SINGLE_UNIVERSITY_QUERY } from '../../../graphql/university/queries';
import Loader from '../../../components/Loader';
import Feedback from '../../../components/Feedback';
import Page from '../../../components/GenericDashboard/Page';
import UniversityForm from './universityForm';

const EditUniversity = () => {
  const router = useRouter();
  const { id } = router.query;

  const [university, setUniversity] = useState();

  const getSingleUniversity = useQuery(GET_SINGLE_UNIVERSITY_QUERY, {
    variables: {
      searchParams: {
        id,
      },
    },
  });

  useEffect(() => {
    const singleUniversity = get(getSingleUniversity, 'data.singleUniversity');
    setUniversity(singleUniversity);
  }, [getSingleUniversity]);

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
        <Page
          title={university.name}
        >
          <UniversityForm university={university} />
        </Page>
      )}
    </>
  );
};

export default EditUniversity;
