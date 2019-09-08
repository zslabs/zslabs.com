import { rgba } from 'polished';
import { generateGradient } from 'chaoskit/src/assets/styles/utility/gradient';

import pattern from '../media/pattern.png';
import bubbles from '../media/bubbles.svg';

export const global = theme => ({
  html: {
    position: 'relative',

    '&::before': {
      content: "''",
      width: '100%',
      height: 200,
      position: 'absolute',
      top: '-$global-whitespace-large',
      left: '0',
      background: `url(${pattern})`,
      maskImage: `url(${bubbles})`,
      zIndex: '-2',
    },

    '&::after': {
      content: "''",
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: 200,
      background: generateGradient({
        start: theme.color.light.base,
        stop: rgba(theme.color.light.base, 0.85),
        position: 'to bottom',
      }),
      zIndex: -1,
    },
  },

  // Reset `letterSpacing` Chaoskit does by default
  'h1, h2, h3, h4': {
    letterSpacing: 'normal',
  },
});
