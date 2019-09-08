import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { Tooltip } from 'chaoskit/src/components';
import { misc } from 'chaoskit/src/assets/styles/utility';
import { withTheme } from 'emotion-theming';

import Foundation from '../../layouts/Foundation';
import Icon from '../../components/Icon';
import { formatDate } from '../../helpers/config';
import pattern from '../../assets/media/pattern.png';

const Post = ({
  theme,
  data: {
    post: {
      html,
      frontmatter: { title, date, dateModified },
    },
  },
}) => (
  <Foundation>
    <Helmet title={`${title} - Zach Schnackel`} />
    <article>
      <header css={{ textAlign: 'center' }}>
        <h1 css={{ marginBottom: theme.space.small }}>{title}</h1>
        <h5
          css={{ marginTop: 0, marginBottom: 0, color: theme.fontColor.muted }}
        >
          {formatDate(date)}
          {dateModified && (
            <Tooltip content={`Last updated ${formatDate(dateModified)}`}>
              <span
                css={{ display: 'inline-block', marginLeft: theme.space.small }}
              >
                <Icon icon="question-circle" />
              </span>
            </Tooltip>
          )}
        </h5>
      </header>
      <div
        css={[
          misc.trimChildren,
          misc.fluidSize({
            theme,
            property: 'fontSize',
            from: theme.fontSize.base,
            to: theme.fontSize.medium,
          }),
          misc.fluidSize({
            theme,
            property: 'paddingTop',
            from: theme.space.large,
            to: theme.space.large + theme.space.base,
          }),
          misc.fluidSize({
            theme,
            property: 'paddingBottom',
            from: theme.space.large,
            to: theme.space.large + theme.space.base,
          }),
          misc.fluidSize({
            theme,
            property: 'marginBottom',
            from: theme.space.large,
            to: theme.space.large + theme.space.base,
          }),
          {
            position: 'relative',

            '&::before, &::after': {
              content: "''",
              position: 'absolute',
              background: `url(${pattern}) no-repeat`,
              backgroundSize: '1500px 1000px',
              backgroundPosition: '-800px -575px',
              height: 2,
              left: '50%',
              transform: 'translateX(-50%)',
            },

            '&::before': {
              width: 250,
              bottom: 0,
            },

            '&::after': {
              width: 125,
              bottom: -theme.space.base,
            },
          },
        ]}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  </Foundation>
);

Post.propTypes = {
  data: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(Post);

export const pageQuery = graphql`
  query ArticleSingle($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      ...PostFragment
    }
  }
`;
