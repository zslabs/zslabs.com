import PropTypes from 'prop-types'
import { useTheme } from 'emotion-theming'
import { Button, List, ListItem } from 'chaoskit/src/components'
import { preToCodeBlock } from 'mdx-utils'
import GHSlugger from 'github-slugger'

import Icon from './Icon'
import Code from './Code'
import Quote from './Quote'
import GatsbyLink from './Link'

// Checks against absolute URLs that share 👇 so we can still pass it along to Gatsby's internal link component
const domainRegex = /http[s]*:\/\/[www.]*zslabs\.com[/]?/
// @NOTE We can use a REGEX like this for URLs we want to be treated as external which could be used for Netlify redirects
// /http[s]*:\/\/[www.]*zslabs\.com(?!\/i-am-external|\/me-too)[/]?/

/* eslint-disable jsx-a11y/anchor-has-content */
export const TextLink = ({ href, ...rest }) => {
  const sameDomain = domainRegex.test(href)

  if (sameDomain) {
    href = href.replace(domainRegex, '/')
  }

  if (href.startsWith('/')) {
    return <GatsbyLink data-link-internal to={href} {...rest} />
  }

  // Treat urls that aren't web protocols as "normal" links
  if (!href.startsWith('http')) {
    return <a href={href} {...rest} /> // eslint-disable-line jsx-a11y/anchor-has-content
  }

  return (
    <a
      data-link-external
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      {...rest}
    />
  )
}

TextLink.propTypes = {
  href: PropTypes.string.isRequired,
}
/* eslint-enable jsx-a11y/anchor-has-content */

const AutoLinkHeader = ({ as: Component, children, ...rest }) => {
  const theme = useTheme()

  const slugger = new GHSlugger()

  const id = slugger.slug(children)

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

export const base = {
  a: (props) => <TextLink {...props} />,
  ul: (props) => <List space="small" type="circles" {...props} />,
  ol: (props) => <List space="small" type="numbers" {...props} />,
  li: (props) => <ListItem {...props} />,
  h1: (props) => <AutoLinkHeader as="h1" {...props} />,
  h2: (props) => <AutoLinkHeader as="h2" {...props} />,
  h3: (props) => <AutoLinkHeader as="h3" {...props} />,
  h4: (props) => <AutoLinkHeader as="h4" {...props} />,
  h5: (props) => <AutoLinkHeader as="h5" {...props} />,
  blockquote: (props) => <Quote {...props} />,
  pre: (preProps) => {
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
}

export const shortcodes = { ...base, ...components }
