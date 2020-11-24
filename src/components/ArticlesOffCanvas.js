import * as React from 'react'
import PropTypes from 'prop-types'
import { OffCanvas } from 'chaoskit/src/components'
import { useTheme } from '@emotion/react'

import Icon from './Icon'
import { BubbleList, BubbleListItem } from './BubbleList'
import StyledButton from './StyledButton'

import useArticlesOffCanvasState from '~hooks/useArticlesOffCanvasState'
import { titleStyles } from '~helpers'

const ArticlesOffCanvas = ({ articles }) => {
  const theme = useTheme()

  const open = useArticlesOffCanvasState((state) => state.open)
  const toggle = useArticlesOffCanvasState((state) => state.toggle)

  return (
    <React.Fragment>
      <StyledButton
        className="ZS__Header__Item"
        type="reset"
        onClick={toggle}
        aria-label="Toggle menu"
      >
        <Icon
          icon="menu"
          css={{ width: theme.height.xsmall, height: theme.height.xsmall }}
        />
      </StyledButton>
      <OffCanvas open={open} panelWidth={350} setIsOpen={toggle}>
        <h2
          css={[
            titleStyles(theme),

            {
              '&::before': {
                clipPath:
                  'polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)',
                backgroundPosition: '-325px -315px',
              },
            },
          ]}
        >
          Articles
        </h2>
        <BubbleList>
          {articles.map(({ node }) => (
            <BubbleListItem
              key={node.frontmatter.title}
              url={node.fields.fullUrl}
              title={node.frontmatter.title}
              meta={node.frontmatter.date}
              linkProps={{
                onClick: toggle,
              }}
            />
          ))}
        </BubbleList>
      </OffCanvas>
    </React.Fragment>
  )
}

ArticlesOffCanvas.propTypes = {
  articles: PropTypes.array.isRequired,
}

export default ArticlesOffCanvas
