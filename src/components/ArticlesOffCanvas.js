import { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, List, ListItem, OffCanvas } from 'chaoskit/src/components';

import { Context } from './Context';
import Icon from './Icon';
import Link from './Link';
import { formatDate } from '../helpers/config';

const ArticlesOffCanvas = ({ articles }) => {
  const {
    state: { offCanvasOpen },
    dispatch,
  } = useContext(Context);

  return (
    <Fragment>
      <Button
        type="reset"
        className="header-menu"
        onClick={() => {
          dispatch({
            type: 'toggleOffCanvas',
          });
        }}
        aria-label="Toggle menu"
      >
        <Icon icon="menu" />
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
        <h2 className="offCanvas-title">Articles</h2>
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
};

export default ArticlesOffCanvas;
