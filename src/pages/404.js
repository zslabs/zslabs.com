import { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Foundation from '../layouts/Foundation';

const NotFoundPage = () => (
  <Foundation
    render={() => (
      <Fragment>
        <Helmet title="404 Page Not Found" />
        <h1 className="notFound-title">404</h1>
      </Fragment>
    )}
  />
);

export default NotFoundPage;
