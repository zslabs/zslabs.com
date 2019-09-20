import { Helmet } from 'react-helmet';

import Foundation from '../layouts/Foundation';
import pattern from '../assets/media/pattern.png';

const NotFoundPage = () => (
  <Foundation>
    <Helmet title="404 Page Not Found" />
    <h1
      css={{
        WebkitBackgroundClip: 'text !important',
        WebkitTextFillColor: 'transparent !important',
        background: `url(${pattern}) no-repeat 50%`,
        backgroundSize: 'cover',
        fontSize: '25vw',
        textAlign: 'center',
        marginBottom: 0,
      }}
    >
      404
    </h1>
  </Foundation>
);

export default NotFoundPage;
