import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { Tooltip } from 'chaoskit/src/components';

import Foundation from '../../layouts/Foundation';
import Icon from '../../components/Icon';
import { formatDate } from '../../helpers/config';

const Post = ({
  data: {
    post: {
      html,
      frontmatter: { title, date, dateModified },
    },
  },
}) => (
  <Foundation>
    <Helmet title={`${title} - Zach Schnackel`} />
    <article className="article">
      <header className="u-textCenter">
        <h1 className="u-mb--small">{title}</h1>
        <h5 className="u-mv--remove u-textMuted">
          {formatDate(date)}
          {dateModified && (
            <Tooltip content={`Last updated ${formatDate(dateModified)}`}>
              <span className="u-inlineBlock u-ml--small">
                <Icon icon="question-circle" />
              </span>
            </Tooltip>
          )}
        </h5>
      </header>
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  </Foundation>
);

Post.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Post;

export const pageQuery = graphql`
  query ArticleSingle($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      ...PostFragment
    }
  }
`;
