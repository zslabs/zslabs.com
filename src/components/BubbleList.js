import { useContext } from 'react';
import { Badge, List, ListItem } from 'chaoskit/src/components';
import { withTheme } from 'emotion-theming';

import Link from './Link';
import { ZSContext } from './ZSContext';

export const BubbleList = withTheme(({ theme, ...opts }) => (
  <List space="medium" {...opts} />
));

const bubbleSize = 8;

export const BubbleListItem = withTheme(
  ({ theme, url, title, meta, badge, children, ...opts }) => {
    const { dispatch } = useContext(ZSContext);

    return (
      <ListItem
        css={{
          display: 'grid',
          alignItems: 'center',
          gridGap: theme.space.base,
        }}
        {...opts}
      >
        <div
          css={{
            width: bubbleSize,
            height: bubbleSize,
            border: 2,
            borderRadius: '50%',
            background: theme.color.light.base,
          }}
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
                display: 'grid',
                gridGap: theme.space.xsmall,
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
                  >
                    {title}
                  </Link>
                ) : (
                  <a href={url.to} target="_blank" rel="noopener noreferrer">
                    {title}
                  </a>
                )
              ) : (
                <h4>{title}</h4>
              )}
              {meta && (
                <div
                  css={{
                    color: theme.fontColor.muted,
                    fontSize: theme.fontSize.small,
                  }}
                >
                  {meta}
                </div>
              )}
            </div>
            {badge && <Badge label={badge} />}
          </div>
          {children}
        </div>
      </ListItem>
    );
  }
);
