import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';

// This component gets around an oddity where @reach/router doesn't appropriately handle active links; so we're stubbing in our own logic
const Link = forwardRef(({ exact, className, children, ...props }, ref) => (
  <GatsbyLink
    {...props}
    ref={ref}
    getProps={({ isCurrent, isPartiallyCurrent }) => ({
      className: [
        className,
        exact && isCurrent ? 'test' : '',
        !exact && isPartiallyCurrent ? 'test' : '',
      ]
        .join(' ')
        .trim(),
    })}
  >
    {children}
  </GatsbyLink>
));

Link.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  exact: PropTypes.bool,
};

Link.defaultProps = {
  className: '',
};

export default Link;
