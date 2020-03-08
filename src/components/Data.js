import PropTypes from 'prop-types'
import parser from 'html-react-parser'

const Data = ({ children }) => parser(children)

Data.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Data
