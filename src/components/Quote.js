import PropTypes from 'prop-types'
import { useTheme } from 'emotion-theming'
import { misc } from 'chaoskit/src/assets/styles/utility'

import quoteIcon from '~icons/quote.svg'

const Quote = ({ children, ...rest }) => {
  const theme = useTheme()

  return (
    <blockquote
      css={[
        misc.fluidSize({
          theme,
          property: 'fontSize',
          from: theme.fontSize.base,
          to: theme.fontSize.medium,
        }),
        misc.fluidSize({
          theme,
          property: 'padding',
          from: theme.space.base,
          to: theme.space.large,
        }),
        {
          // Resets/changes from normal blockquote
          padding: 0,
          position: 'relative',
          zIndex: 1,
          fontStyle: 'normal',

          border: theme.border.base,
          borderRadius: theme.borderRadius.base,
          marginTop: theme.space.large,
          marginBottom: theme.space.large,

          '&::before': {
            '--quote-icon-size': `${theme.fontSize.large + theme.space.base}px`,

            content: "''",
            position: 'absolute',
            width: 'var(--quote-icon-size)',
            height: 'var(--quote-icon-size)',
            fontSize: theme.fontSize.large,
            background: theme.color.light.base,
            border: theme.border.base,
            borderRadius: '50%',
            display: 'grid',
            alignItems: 'center',
            justifyItems: 'center',
            boxShadow: `0 0 0 4px ${theme.color.light.base}`,
            top: 'calc(var(--quote-icon-size) / -2)',
            left: 'calc(var(--quote-icon-size) / -2)',
            zIndex: 1,
            backgroundImage: `url(${quoteIcon})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: `${theme.fontSize.large}px ${theme.fontSize.large}px`,
          },
        },
      ]}
      {...rest}
    >
      {children}
    </blockquote>
  )
}

Quote.propTypes = {
  children: PropTypes.node,
}

export default Quote
