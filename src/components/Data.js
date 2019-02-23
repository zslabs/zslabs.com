import PropTypes from 'prop-types';
import remark from 'remark';
import html from 'remark-html';
import slug from 'remark-slug';
import relativeLinks from 'remark-relative-links';
import externalLinks from 'remark-external-links';
import parser from 'html-react-parser';
import strip from 'strip-markdown';

import { domainRegex } from '../../utils/helpers';

// Provides consistent way for us to render content from yml file that propery encodes entities as well
const Data = (props) => {
  const { children, markdown, stripMarkdown } = props;

  if (!children) return null;

  if (markdown) {
    // Using suggestion from https://github.com/gatsbyjs/gatsby/issues/5021#issuecomment-382700605
    return parser(
      remark()
        .use(relativeLinks, {
          domainRegex,
        })
        .use(externalLinks, {
          target: '_blank',
          rel: ['noopener', 'noreferrer'],
        })
        .use(slug)
        .use(html)
        .processSync(children)
        .toString(),
    );
  }

  if (stripMarkdown) {
    return parser(
      remark()
        .use(strip)
        .processSync(children)
        .toString(),
    );
  }

  return parser(children);
};

Data.propTypes = {
  children: PropTypes.node,
  markdown: PropTypes.bool,
  stripMarkdown: PropTypes.bool,
};

export default Data;
