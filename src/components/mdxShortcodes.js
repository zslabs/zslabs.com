import PropTypes from 'prop-types'
import { useTheme } from 'emotion-theming'
import { kebabCase, toLower } from 'lodash-es'
import { Button } from 'chaoskit/src/components'
import { preToCodeBlock } from 'mdx-utils'

import Icon from './Icon'
import Code from './Code'

const Link = props => {
  console.log(props)

  // eslint-disable-next-line
  return <a {...props} />
}

const AutoLinkHeader = ({ as: Component, children, ...rest }) => {
  const theme = useTheme()

  const id = kebabCase(toLower(children))

  return (
    <Component
      id={id}
      css={{
        position: 'relative',

        '&:hover, &:focus': {
          '.AutoLinkHeader__Link': {
            opacity: 1,
            pointerEvents: 'auto',
          },
        },
      }}
      {...rest}
    >
      <a
        href={`#${id}`}
        css={{
          pointerEvents: 'none',
          position: 'absolute',
          opacity: 0,
          top: '50%',
          left: 0,
          transform: 'translate(-100%, -50%)',
          paddingRight: theme.space.small,
          transition: `opacity ${theme.timing.base} ${theme.transition.bounce}`,
        }}
        className="AutoLinkHeader__Link"
      >
        <Icon
          icon="anchor"
          css={{
            fontSize: theme.fontSize.small,
            color: theme.fontColor.base,
          }}
        />
      </a>
      {children}
    </Component>
  )
}

AutoLinkHeader.propTypes = {
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5']),
  children: PropTypes.node.isRequired,
}

const CodePen = ({ user, pen }) => (
  <div
    css={{
      position: 'relative',
      paddingBottom: '56.25%',

      iframe: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      },
    }}
  >
    <iframe
      title="CodePen embed"
      scrolling="no"
      src={`https://codepen.io/${user}/embed/preview/${pen}/?theme-id=dark&default-tab=result`}
      allowFullScreen
    />
  </div>
)

CodePen.propTypes = {
  pen: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
}

export const base = {
  a: props => <Link {...props} />,
  h1: props => <AutoLinkHeader as="h1" {...props} />,
  h2: props => <AutoLinkHeader as="h2" {...props} />,
  h3: props => <AutoLinkHeader as="h3" {...props} />,
  h4: props => <AutoLinkHeader as="h4" {...props} />,
  h5: props => <AutoLinkHeader as="h5" {...props} />,
  pre: preProps => {
    const props = preToCodeBlock(preProps)
    // If there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />
    }
    // It's possible to have a pre without a code in it
    return <pre {...preProps} />
  },
}

export const components = {
  Button,
  CodePen,
}

export const shortcodes = { ...base, ...components }
