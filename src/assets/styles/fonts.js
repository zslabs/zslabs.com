import { css } from '@emotion/core'

import ManropeMediumWoff2 from '../fonts/Manrope-Medium.woff2'
import ManropeMediumWoff from '../fonts/Manrope-Medium.woff'
import ManropeExtraBoldWoff2 from '../fonts/Manrope-ExtraBold.woff2'
import ManropeExtraBoldWoff from '../fonts/Manrope-ExtraBold.woff'

export const fonts = (theme) => css`
  @font-face {
    font-family: Manrope;
    src: local(😜), url(${ManropeMediumWoff2}) format('woff2'),
      url(${ManropeMediumWoff}) format('woff');
    font-weight: ${theme.fontWeight.base};
    font-style: normal;
  }

  @font-face {
    font-family: Manrope;
    src: local(😜), url(${ManropeExtraBoldWoff2}) format('woff2'),
      url(${ManropeExtraBoldWoff}) format('woff');
    font-weight: ${theme.fontWeight.bold};
    font-style: normal;
  }
`
