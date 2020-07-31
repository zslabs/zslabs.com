import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'
import { CacheProvider } from '@emotion/core'
import { ckCache } from 'chaoskit/src/helpers/Wrapper'
import { MDXProvider } from '@mdx-js/react'

import { zslabsTheme } from './utils/theme'

import { shortcodes } from '~components/mdxShortcodes'

export const wrapRootElement = ({ element }) => (
  <CacheProvider value={ckCache}>
    <ThemeProvider theme={zslabsTheme}>
      <MDXProvider components={shortcodes}>{element}</MDXProvider>
    </ThemeProvider>
  </CacheProvider>
)

wrapRootElement.propTypes = {
  element: PropTypes.node.isRequired,
}
