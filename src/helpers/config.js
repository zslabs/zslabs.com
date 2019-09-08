import { format } from 'date-fns';

import dots from '../assets/media/dots.svg';

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
