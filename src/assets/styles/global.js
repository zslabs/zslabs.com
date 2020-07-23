import { rgba } from 'polished'
import { generateGradient } from 'chaoskit/src/assets/styles/utility/gradient'

import pattern from '../media/pattern.png'
import bubbles from '../media/bubbles.svg'

export const global = (theme) => ({
  html: {
    fontFeatureSettings: '"calt", "liga"',
    letterSpacing: 'calc(-.03058em + .44638px)',
  },

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
        start: rgba(theme.color.light.base, 0.85),
        stop: theme.color.light.base,
        position: 'to bottom',
      }),
      zIndex: -1,
    },
  },

  // Article specific
  '.svgBackground-example': {
    width: 50,
  },
})
