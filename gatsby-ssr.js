import { CacheProvider, ThemeProvider } from '@emotion/react'
import { createCKCache } from 'chaoskit/src/helpers/Wrapper'
import { MDXProvider } from '@mdx-js/react'

import { zslabsTheme } from './utils/theme'

import { shortcodes } from '~components/mdxShortcodes'

export const wrapRootElement = ({ element }) => (
  <CacheProvider value={createCKCache()}>
    <ThemeProvider theme={zslabsTheme}>
      <MDXProvider components={shortcodes}>{element}</MDXProvider>
    </ThemeProvider>
  </CacheProvider>
)
