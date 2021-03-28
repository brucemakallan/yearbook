import Head from 'next/head';

const WEBSITE_TITLE = 'Yearbook | madeyear.com';

const CustomHead = ({ title = WEBSITE_TITLE, page, pageDescription }) => (
  <Head>
    <title>
      {page ? `Yearbook | ${page}` : title}
    </title>

    <link rel="icon" href="/favicon.ico" />

    <meta key="theme" name="theme-color" content="#000000" />
    <meta key="short-desc" name="Yearbook" content="Online Yearbook generator for Schools and Universities" />
    <meta key="name" name="application-name" content="Yearbook madeyear.com" />
    <meta key="author" name="author" content="madeyear.com" />
    <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      key="description"
      name="description"
      content={pageDescription || 'Online Yearbook generator for Schools and Universities'}
    />
    <meta
      key="keywords"
      name="keywords"
      content="Yearbook, Year, Book, Madeyear, Made, School, University, Universities, Student, madeyear.com"
    />
  </Head>
);

export default CustomHead;
