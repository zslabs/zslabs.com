import PropTypes from 'prop-types'
import { renderToString } from 'react-dom/server'
import { ThemeProvider } from 'emotion-theming'
import { CacheProvider } from '@emotion/core'
import createEmotionServer from 'create-emotion-server'
import { createCKCache } from 'chaoskit/src/helpers/Wrapper'
import { MDXProvider } from '@mdx-js/react'

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
      <ThemeProvider theme={zslabsTheme}>{bodyComponent}</ThemeProvider>
    </CacheProvider>
  )

  const { html, css, ids } = extractCritical(renderToString(element))

  setHeadComponents([
    <style
      data-emotion-css={ids.join(' ')}
      dangerouslySetInnerHTML={{
        __html: css,
      }}
    />,
  ])

  replaceBodyHTMLString(html)
}

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={shortcodes}>{element}</MDXProvider>
)

wrapRootElement.propTypes = {
  element: PropTypes.node.isRequired,
}
