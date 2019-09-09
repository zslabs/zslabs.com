import { format } from 'date-fns';
import { misc } from 'chaoskit/src/assets/styles/utility';

import dots from '../assets/media/dots.svg';
import pattern from '../assets/media/pattern.png';

export const formatDate = date => format(date, 'MMMM D, YYYY');

export const backgroundDots = (fill = '#fff') => ({
  content: "''",
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: '0.05',
  backgroundColor: 'transparent',
  fill,
  backgroundSize: 'auto 8px',
  backgroundRepeat: 'repeat',
  backgroundImage: `url(${dots})`,
});

export const titleStyles = theme => ({
  position: 'relative',
  display: 'inline-flex',
  zIndex: 1,

  '&::before': [
    misc.fluidSize({
      theme,
      property: 'width',
      from: theme.fontSize.h3 / 1.25,
      to: theme.fontSize.h2 / 1.25,
    }),
    misc.fluidSize({
      theme,
      property: 'height',
      from: theme.fontSize.h3 / 1.25,
      to: theme.fontSize.h2 / 1.25,
    }),
    {
      content: "''",
      zIndex: -1,
      position: 'absolute',
      top: 0,
      left: 0,
      transform: 'translateX(-25%)',
      backgroundImage: `url(${pattern})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '750px 500px',
    },
  ],
});
