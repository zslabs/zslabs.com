import { rgba, padding } from 'polished'
import { generateGradient } from 'chaoskit/src/assets/styles/utility/gradient'

import pattern from '../media/pattern.png'
import bubbles from '../media/bubbles.svg'

export const global = theme => ({
  body: {
    position: 'relative',

    '&::before, &::after': {
      content: "''",
      width: '100%',
      height: 200,
      position: 'absolute',
      left: 0,
    },

    '&::before': {
      top: -theme.space.large,
      background: `url(${pattern})`,
      maskImage: `url(${bubbles})`,
      zIndex: '-2',
    },

    '&::after': {
      top: 0,
      background: generateGradient({
        start: theme.color.light.base,
        stop: rgba(theme.color.light.base, 0.85),
        position: 'to bottom',
      }),
      zIndex: -1,
    },
  },

  // Article specific
  '.svgBackground-example': {
    width: 50,
  },

  '.filename': {
    marginTop: theme.space.base,
    background: theme.color.dark.base,
    color: theme.contrast.base,
    fontSize: theme.fontSize.small,
    fontFamily: theme.fontFamily.code,
    ...padding(theme.space.xsmall, theme.space.base),
    borderTopLeftRadius: theme.borderRadius.base,
    borderTopRightRadius: theme.borderRadius.base,

    '+ .gatsby-highlight pre': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  },

  //
  // CodePen Embeds
  // `gatsby-remark-codepen`
  //

  '.codepenEmbed': {
    position: 'relative',
    paddingBottom: '56.25%',

    iframe: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
  },
})
