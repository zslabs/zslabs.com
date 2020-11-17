import PropTypes from 'prop-types'
import { rgba } from 'polished'
import { Badge, List, ListItem } from 'chaoskit/src/components'
import { link, text } from 'chaoskit/src/assets/styles/utility'
import { useTheme } from '@emotion/react'

import TextLink from './TextLink'

import pattern from '~media/pattern.png'

const bubbleSize = 16

export const BubbleList = ({ ...opts }) => {
  const theme = useTheme()

  return (
    <List
      css={{
        position: 'relative',

        '&::before, &::after': {
          content: "''",
          zIndex: -1,
          position: 'absolute',
          top: 0,
          left: bubbleSize / 2,
          transform: 'translateX(-50%)',
          background: theme.fontColor.base,
        },

        '&::before': {
          width: bubbleSize / 2,
          height: bubbleSize / 2,
          borderRadius: theme.borderRadius.rounded,
        },

        '&::after': {
          bottom: 0,
          background: theme.fontColor.base,
          width: 2,
        },
      }}
      space="medium"
      {...opts}
    />
  )
}

const linkStyles = (theme) => [
  text.heading(theme),
  link.heading(theme),
  {
    ...theme.fontSize.xlarge__fluid,
    backgroundImage: `linear-gradient(${rgba(
      theme.fontColor.heading,
      0.075
    )}, ${rgba(theme.fontColor.heading, 0.075)})`,
    backgroundPosition: '0% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '0% 8px',
    transition: `background-size ${theme.timing.long} ${theme.transition.base}`,

    '&:hover, &:focus, &.is-active': {
      backgroundSize: '100% 8px',
    },
  },
]

export const BubbleListItem = ({
  url,
  title,
  meta,
  badge,
  first,
  children,
  linkProps = {},
  ...rest
}) => {
  const theme = useTheme()

  return (
    <ListItem
      css={{
        display: 'grid',
        alignItems: 'center',
        gridGap: theme.space.medium,
        gridTemplateColumns: `${bubbleSize}px 1fr`,

        '&:hover, &:focus': {
          '.ZS__Bubble': {
            transform: 'scale(1.25)',
            backgroundColor: theme.fontColor.base,
          },
        },

        '&:first-of-type': {
          paddingTop: theme.space.medium,
        },

        '&:last-of-type': {
          position: 'relative',
          paddingBottom: theme.space.medium,

          '&::after': {
            content: "''",
            zIndex: -1,
            position: 'absolute',
            bottom: 0,
            left: bubbleSize / 2,
            transform: 'translateX(-50%)',
            background: theme.fontColor.base,
            width: bubbleSize / 2,
            height: bubbleSize / 2,
            borderRadius: theme.borderRadius.rounded,
          },
        },
      }}
      {...rest}
    >
      <div
        css={{
          width: bubbleSize,
          height: bubbleSize,
          border: `2px solid ${theme.fontColor.base}`,
          borderRadius: theme.borderRadius.rounded,
          backgroundColor: theme.color.light.base,
          transition: `all ${theme.timing.base} ${theme.transition.bounce}`,
          boxShadow: `0 0 0 ${bubbleSize / 4}px ${theme.color.light.base}`,
        }}
        className="ZS__Bubble"
      />
      <div>
        <div
          css={[
            badge && {
              display: 'grid',
              gridGap: theme.space.small,

              [theme.mq.small]: {
                gridTemplateColumns: '1fr auto',
              },
            },
          ]}
        >
          <div
            css={{
              display: 'inline-grid',
            }}
          >
            <div>
              {url ? (
                <TextLink href={url} css={linkStyles(theme)} {...linkProps}>
                  {title}
                </TextLink>
              ) : (
                <h4 css={{ ...theme.fontSize.xlarge__fluid, marginBottom: 0 }}>
                  {title}
                </h4>
              )}
            </div>
            {meta && (
              <div
                css={{
                  color: theme.fontColor.muted,
                }}
              >
                {meta}
              </div>
            )}
          </div>
          {badge && (
            <div>
              <Badge
                css={[
                  first && {
                    border: 0,
                    backgroundImage: `url(${pattern}) !important`,
                    backgroundColor: 'transparent',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'auto',
                    color: theme.contrast.base,
                    textShadow: `0 1px 10px ${rgba(
                      theme.color.dark.base,
                      0.1
                    )}`,
                    backgroundPosition: '60% 10%',
                  },
                ]}
              >
                {badge}
              </Badge>
            </div>
          )}
        </div>
        {children && (
          <div
            css={{
              ...theme.fontSize.medium__fluid,
              marginTop: theme.space.small,
            }}
          >
            {children}
          </div>
        )}
      </div>
    </ListItem>
  )
}

BubbleListItem.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string.isRequired,
  meta: PropTypes.string,
  badge: PropTypes.string,
  first: PropTypes.bool,
  children: PropTypes.node,
  linkProps: PropTypes.object,
}
