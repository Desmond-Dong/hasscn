import Theme from 'rspress/theme';
import { Helmet } from 'react-helmet';

const Layout = () => (
  <>
    <Helmet>
      <meta name="referrer" content="origin-when-cross-origin" />
    </Helmet>
  </>
);

export default {
  ...Theme,
  Layout,
};

export * from 'rspress/theme';