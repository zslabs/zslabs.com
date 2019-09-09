import { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, List, ListItem, OffCanvas } from 'chaoskit/src/components';
import { withTheme } from 'emotion-theming';

import { ZSContext } from './ZSContext';
import Icon from './Icon';
import Link from './Link';
import { formatDate, titleStyles } from '../helpers/config';

const ArticlesOffCanvas = ({ articles, theme }) => {
  const {
    state: { offCanvasOpen },
    dispatch,
  } = useContext(ZSContext);

  return (
    <Fragment>
      <Button
        type="reset"
        onClick={() => {
          dispatch({
            type: 'toggleOffCanvas',
          });
        }}
        aria-label="Toggle menu"
      >
        <Icon
          icon="menu"
          css={{ width: theme.height.xsmall, height: theme.height.xsmall }}
        />
      </Button>
      <OffCanvas
        open={offCanvasOpen}
        panelWidth={350}
        onOffCanvasToggle={() => {
          dispatch({
            type: 'toggleOffCanvas',
          });
        }}
      >
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
        <List className="bubbleList">
          {articles.map(({ node }) => (
            <ListItem key={node.frontmatter.title} className="bubbleList-item">
              <div className="bubbleList-item-bubble" />
              <div className="bubbleList-item-info">
                <Link className="bubbleList-item-link" to={node.fields.fullUrl}>
                  {node.frontmatter.title}
                </Link>
                <p className="u-mt--remove u-textMedium u-textMuted">
                  {formatDate(node.frontmatter.date)}
                </p>
              </div>
            </ListItem>
          ))}
        </List>
      </OffCanvas>
    </Fragment>
  );
};

ArticlesOffCanvas.propTypes = {
  articles: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(ArticlesOffCanvas);
