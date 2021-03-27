import React from 'react';
import PageWithSidebar from "../../components/DashboardComponents/PageWithSidebar";

const DashboardLandingPage = () => {
  return (
    <PageWithSidebar title="Sample">
      DashboardLandingPage
    </PageWithSidebar>
  )
};

export async function getServerSideProps() {
  return { props: {} };
}

export default DashboardLandingPage;
