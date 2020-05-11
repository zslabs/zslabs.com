import { rgba } from 'polished'
import { generateGradient } from 'chaoskit/src/assets/styles/utility/gradient'

import pattern from '../media/pattern.png'
import bubbles from '../media/bubbles.svg'
import link from '../icons/link.svg'

export const global = (theme) => ({
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

  'a > code': {
    position: 'relative',

    '&::after': {
      content: "''",
      display: 'inline-block',
      height: '1em',
      width: '1em',
      background: `url(${link})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      filter: theme.fontColor.filter,
      verticalAlign: 'middle',
      marginLeft: theme.space.xsmall,
      position: 'relative',
      top: '-0.1em',
    },
  },
})
