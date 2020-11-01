import PropTypes from 'prop-types'
import { OutboundLink } from 'gatsby-plugin-gtag'

import GatsbyLink from './Link'

// Checks against absolute URLs that share 👇 so we can still pass it along to Gatsby's internal link component
const domainRegex = /http[s]*:\/\/[www.]*zslabs\.com[/]?/
// @NOTE We can use a REGEX like this for URLs we want to be treated as external which could be used for Netlify redirects
// /http[s]*:\/\/[www.]*zslabs\.com(?!\/i-am-external|\/me-too)[/]?/
const TextLink = ({ href, ...rest }) => {
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
    <OutboundLink
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

export default TextLink
