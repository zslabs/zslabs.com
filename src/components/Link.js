import * as React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import { useTheme } from '@emotion/react'

// This component gets around an oddity where @reach/router doesn't appropriately handle active links; so we're stubbing in our own logic
const Link = React.forwardRef(
  ({ exact, className, children, ...rest }, ref) => {
    const theme = useTheme()

    return (
      <GatsbyLink
        {...rest}
        ref={ref}
        getProps={({ isCurrent, isPartiallyCurrent }) => ({
          className: [
            className,
            exact && isCurrent ? theme.settings.classes.active : '',
            !exact && isPartiallyCurrent ? theme.settings.classes.active : '',
          ]
            .join(' ')
            .trim(),
        })}
      >
        {children}
      </GatsbyLink>
    )
  }
)

Link.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  exact: PropTypes.bool,
}

export default Link
