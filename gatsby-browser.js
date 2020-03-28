import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'
import { CacheProvider } from '@emotion/core'
import { ckCache } from 'chaoskit/src/helpers/Wrapper'
import { MDXProvider } from '@mdx-js/react'

import { ZSProvider } from './src/components/ZSContext'
import { zslabsTheme } from './utils/theme'
import { shortcodes } from './src/components/mdxShortcodes'

export const wrapRootElement = ({ element }) => (
  <ZSProvider>
    <CacheProvider value={ckCache}>
      <ThemeProvider theme={zslabsTheme}>
        <MDXProvider components={shortcodes}>{element}</MDXProvider>
      </ThemeProvider>
    </CacheProvider>
  </ZSProvider>
)

wrapRootElement.propTypes = {
  element: PropTypes.node.isRequired,
}
