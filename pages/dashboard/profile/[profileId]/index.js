import React from 'react';
import { useRouter } from 'next/router';

import ProfilePage from '../../../../components/ProfilePages/profilePage';

const StudentProfilePage = () => {
  const router = useRouter();
  const profileId = router.query?.profileId;

  return (
    <ProfilePage profileId={profileId} />
  );
};

export default StudentProfilePage;
