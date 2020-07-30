import { useTheme } from 'emotion-theming'
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

const Footer = () => {
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
        {
          textAlign: 'center',
          fontSize: theme.fontSize.small,
          color: theme.fontColor.muted,
        },
      ]}
    >
      Copyright © {new Date().getFullYear()} Zach Schnackel. Penalty is 🔥
      <br />
      <FooterLink href="/uses/">Uses</FooterLink> &nbsp;/&nbsp;{' '}
      <FooterLink href="https://github.com/zslabs/zslabs.com">
        Source
      </FooterLink>
    </footer>
  )
}

export default Footer
