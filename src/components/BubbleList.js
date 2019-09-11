import { useContext } from 'react';
import { rgba } from 'polished';
import { Badge, List, ListItem } from 'chaoskit/src/components';
import { link, misc, text } from 'chaoskit/src/assets/styles/utility';
import { withTheme } from 'emotion-theming';

import Link from './Link';
import { ZSContext } from './ZSContext';
import pattern from '../assets/media/pattern.png';

export const BubbleList = withTheme(({ theme, ...opts }) => (
  <List space="medium" {...opts} />
));

const bubbleSize = 16;

const linkStyles = theme => [
  text.heading(theme),
  link.heading(theme),
  {
    ...theme.fontSize.xlarge__fluid,
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'bottom',
    overflow: 'hidden',
    paddingBottom: 3,

    '&::before': {
      content: "''",
      zIndex: -1,
      background: rgba(theme.fontColor.heading, 0.1),
      height: 3,
      top: 'calc(100% - 3px)',
      width: '100%',
      left: 0,
      transform: 'translateX(-100%)',
      position: 'absolute',
      transition: `transform ${theme.timing.base} ${theme.transition.base}`,
    },

    '&:hover, &:focus': {
      '&::before': {
        transform: 'none',
      },
    },
  },
];

export const BubbleListItem = withTheme(
  ({ theme, key, url, title, meta, badge, first, children, ...opts }) => {
    const { dispatch } = useContext(ZSContext);

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
        }}
        {...opts}
      >
        <div
          css={{
            width: bubbleSize,
            height: bubbleSize,
            border: `2px solid ${theme.fontColor.base}`,
            borderRadius: '50%',
            backgroundColor: theme.color.light.base,
            transition: `all ${theme.timing.base} ${theme.transition.bounce}`,
          }}
          className="ZS__Bubble"
        />
        <div>
          <div
            css={[
              badge && {
                display: 'grid',
                gridGap: theme.space.small,
                gridTemplateColumns: 'minmax(0px, 1fr)',

                [theme.mq.small]: {
                  gridTemplateColumns: '1fr auto',
                },
              },
            ]}
          >
            <div
              css={{
                display: 'inline-grid',
                gridTemplateColumns: 'minmax(0px, 1fr)',
              }}
            >
              {/* eslint-disable-next-line no-nested-ternary */}
              {url ? (
                url.type === 'article' ? (
                  <Link
                    to={url.to}
                    onClick={() => {
                      dispatch({
                        type: 'toggleOffCanvas',
                      });
                    }}
                    css={linkStyles(theme)}
                  >
                    {title}
                  </Link>
                ) : (
                  <a
                    href={url.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    css={linkStyles(theme)}
                  >
                    {title}
                  </a>
                )
              ) : (
                <h4 css={{ ...theme.fontSize.xlarge__fluid, marginBottom: 0 }}>
                  {title}
                </h4>
              )}
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
                  label={badge}
                />
              </div>
            )}
          </div>
          {children && (
            <div
              css={
                (misc.fluidSize({
                  theme,
                  property: 'fontSize',
                  from: theme.fontSize.base,
                  to: theme.fontSize.medium,
                }),
                {
                  marginTop: theme.space.small,
                })
              }
            >
              {children}
            </div>
          )}
        </div>
      </ListItem>
    );
  }
);
