import PropTypes from 'prop-types'
import parse, { domToReact } from 'html-react-parser'

import TextLink from './TextLink'

const parserOptions = {
  replace: ({ attribs, name, children }) => {
    if (name === 'a' && attribs.href) {
      return (
        <TextLink {...attribs}>{domToReact(children, parserOptions)}</TextLink>
      )
    }
  },
}

// Provides consistent way for us to render content from Markdown frontmatter that propery encodes entities as well
const Data = ({ children }) => {
  if (!children) return null

  return parse(children, parserOptions)
}

Data.propTypes = {
  children: PropTypes.node,
}

export default Data
