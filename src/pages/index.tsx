import { Redirect } from '@docusaurus/router';
import Head from '@docusaurus/Head';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <meta name="google-site-verification" content="p1d2CJxBesOeXENEYrDsrLDTPfWOBVTmwXnsfdB7b1Q" />
      </Head>
      <Redirect to="/introduction" />
    </>
  );
}