import React from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import { config } from 'chaoskit/src/helpers/config';

// This component gets around an oddity where @reach/router doesn't appropriately handle active links; so we're stubbing in our own logic
const Link = React.forwardRef((props, ref) => {
  const { exact, className, children } = props;

  const activeClassName = config.classes.active;

  return (
    <GatsbyLink
      {...props}
      ref={ref}
      getProps={({ isCurrent, isPartiallyCurrent }) => ({
        className: [
          className,
          exact && isCurrent ? activeClassName : '',
          !exact && isPartiallyCurrent ? activeClassName : '',
        ]
          .join(' ')
          .trim(),
      })}
    >
      {children}
    </GatsbyLink>
  );
});

Link.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  exact: PropTypes.bool,
};

Link.defaultProps = {
  className: '',
};

export default Link;
