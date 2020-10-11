import PropTypes from 'prop-types'
import { useTheme } from 'emotion-theming'
import { Button } from 'chaoskit/src/components'

import pattern from '~media/pattern.png'

const StyledButton = ({ variation, ...rest }) => {
  const theme = useTheme()

  return (
    <Button
      css={[
        variation && {
          boxShadow: theme.boxShadow.neutral,
          backgroundImage: `url(${pattern}) !important`,
          backgroundColor: 'transparent',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto',
          color: theme.contrast.base,
          transition: `transform ${theme.timing.base} ${theme.transition.bounce}`,

          '&:hover, &:focus': {
            color: theme.contrast.base,
            transform: 'scale(1.125)',
          },
        },

        variation === 'default' && {
          backgroundPosition: '20% 15%',
        },
        variation === 'primary' && {
          backgroundPosition: '60% 10%',
        },
        variation === 'secondary' && {
          backgroundPosition: '70% 85%',
        },
        variation === 'submit' && {
          backgroundPosition: '40% 15%',
        },
        variation === 'github' && {
          backgroundPosition: '45% 70%',
        },
        variation === 'codepen' && {
          backgroundPosition: '30% 30%',
        },
        variation === 'twitter' && {
          backgroundPosition: '70% 10%',
        },
      ]}
      {...rest}
    />
  )
}

StyledButton.propTypes = {
  variation: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'submit',
    'github',
    'codepen',
    'twitter',
  ]),
}

export default StyledButton
