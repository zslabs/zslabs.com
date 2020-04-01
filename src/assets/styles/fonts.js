import { css } from '@emotion/core'

import CalibreRegularWoff2 from '../fonts/Calibre-RWeb-Regular.woff2'
import CalibreRegularWoff from '../fonts/Calibre-RWeb-Regular.woff'
import CalibreSemiboldWoff2 from '../fonts/Calibre-RWeb-Semibold.woff2'
import CalibreSemiboldWoff from '../fonts/Calibre-RWeb-Semibold.woff'

export const fonts = (theme) => css`
  @font-face {
    font-family: Calibre;
    src: local(😜), url(${CalibreRegularWoff2}) format('woff2'),
      url(${CalibreRegularWoff}) format('woff');
    font-weight: ${theme.fontWeight.base};
    font-style: normal;
  }

  @font-face {
    font-family: Calibre;
    src: local(😜), url(${CalibreSemiboldWoff2}) format('woff2'),
      url(${CalibreSemiboldWoff}) format('woff');
    font-weight: ${theme.fontWeight.bold};
    font-style: normal;
  }
`
