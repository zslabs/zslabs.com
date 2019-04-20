import { Back } from 'gsap/TweenMax';
import { format } from 'date-fns';

/**
 * Default configuration
 * @type {Object}
 */
export const config = {
  ease: Back.easeOut.config(1.7),
};

export const formatDate = date => format(date, 'MMMM D, YYYY');
