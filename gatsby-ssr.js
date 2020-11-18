import { createCKCache } from 'chaoskit/src/helpers/Wrapper'
import { MDXProvider } from '@mdx-js/react'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import { renderToString } from 'react-dom/server'
import createEmotionServer from '@emotion/server/create-instance'

import { zslabsTheme } from './utils/theme'

import { shortcodes } from '~components/mdxShortcodes'

export const replaceRenderer = ({
  replaceBodyHTMLString,
  bodyComponent,
  setHeadComponents,
}) => {
  const cache = createCKCache()
  const { extractCritical } = createEmotionServer(cache)

  const element = (
    <CacheProvider value={cache}>
      <ThemeProvider theme={zslabsTheme}>
        <MDXProvider components={shortcodes}>{bodyComponent}</MDXProvider>
      </ThemeProvider>
    </CacheProvider>
  )
  const { html, ids, css } = extractCritical(renderToString(element))

  setHeadComponents([
    <style
      key="emotion"
      data-emotion-css={ids.join(' ')}
      dangerouslySetInnerHTML={{
        __html: css,
      }}
    />,
  ])
  replaceBodyHTMLString(html)
}
