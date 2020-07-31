import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Tooltip } from 'chaoskit/src/components'
import { misc } from 'chaoskit/src/assets/styles/utility'
import { useTheme } from 'emotion-theming'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Foundation from '~layouts/Foundation'
import pattern from '~media/pattern.png'
import Icon from '~components/Icon'
import HelmetSEO from '~components/HelmetSEO'

const Post = ({
  data: {
    post: {
      body,
      excerpt,
      frontmatter: { title, date, dateModified },
    },
  },
}) => {
  const theme = useTheme()

  return (
    <Foundation>
      <HelmetSEO title={title} description={excerpt} />
      <article>
        <header css={{ textAlign: 'center' }}>
          <h1 css={{ marginBottom: theme.space.small }}>{title}</h1>
          <h5
            css={{
              marginTop: 0,
              marginBottom: 0,
              color: theme.fontColor.muted,
            }}
          >
            {date}
            {dateModified && (
              <Tooltip content={`Last updated ${dateModified}`}>
                <span
                  css={{
                    display: 'inline-block',
                    marginLeft: theme.space.small,
                  }}
                >
                  <Icon icon="question-circle" />
                </span>
              </Tooltip>
            )}
          </h5>
        </header>
        <div
          className={theme.settings.classes.trim}
          css={[
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
            {
              position: 'relative',
              marginBottom: theme.space.large + theme.space.base,

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
        >
          <MDXRenderer>{body}</MDXRenderer>
        </div>
      </article>
    </Foundation>
  )
}

Post.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Post

export const pageQuery = graphql`
  query ArticleSingle($slug: String!) {
    post: mdx(fields: { slug: { eq: $slug } }) {
      ...PostFragment
    }
  }
`
