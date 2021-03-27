import Head from 'next/head'

const WEBSITE_TITLE = "Yearbook | madeyear.com";

const CustomHead = ({ title=WEBSITE_TITLE, page }) => {
  return (
    <div>
      <Head>
        <title>
          {page ? `Yearbook | ${page}` : title}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
};

export default CustomHead;
