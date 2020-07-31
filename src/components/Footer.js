import PropTypes from 'prop-types'
import { useTheme } from 'emotion-theming'
import clsx from 'clsx'
import { rgba } from 'polished'
import { link } from 'chaoskit/src/assets/styles/utility'
import { fluidSize } from 'chaoskit/src/assets/styles/utility/misc'

import { TextLink } from './mdxShortcodes'

const FooterLink = (props) => {
  const theme = useTheme()

  return (
    <TextLink
      css={[
        link.reset(theme),
        {
          backgroundImage: `linear-gradient(${rgba(
            theme.fontColor.heading,
            0.075
          )}, ${rgba(theme.fontColor.heading, 0.075)})`,
          backgroundPosition: '0% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '0% 4px',
          transition: `background-size ${theme.timing.long} ${theme.transition.base}`,
          fontWeight: theme.fontWeight.bold,

          '&:hover, &:focus, &.is-active': {
            backgroundSize: '100% 4px',
          },
        },
      ]}
      {...props}
    />
  )
}

const Footer = ({ className, runAnimation, ...rest }) => {
  const theme = useTheme()

  return (
    <footer
      css={[
        fluidSize({
          theme,
          property: 'marginTop',
          from: theme.space.large,
          to: theme.space.xlarge,
        }),
        fluidSize({
          theme,
          property: 'marginBottom',
          from: theme.space.base,
          to: theme.space.large,
        }),

        runAnimation && {
          // GSAP
          opacity: 0,
          transform: 'translateY(25%)',
        },

        {
          textAlign: 'center',
          fontSize: theme.fontSize.small,
          color: theme.fontColor.muted,
        },
      ]}
      className={clsx('ZS__Footer', className)}
      {...rest}
    >
      Copyright © {new Date().getFullYear()} Zach Schnackel. Penalty is 🔥
      <div
        css={{
          display: 'grid',
          marginTop: theme.space.small,
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
          gap: theme.space.base,
          gridAutoFlow: 'column',
          gridAutoColumns: 'auto',
        }}
      >
        <FooterLink href="https://github.com/zslabs/zslabs.com">
          Source
        </FooterLink>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  className: PropTypes.string,
  runAnimation: PropTypes.bool,
}

export default Footer
