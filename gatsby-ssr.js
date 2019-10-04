import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { CacheProvider } from '@emotion/core';
import { createCKCache } from 'chaoskit/src/helpers/Wrapper';

import { ZSProvider } from './src/components/ZSContext';
import { zslabsTheme } from './utils/theme';

export const wrapRootElement = ({ element }) => (
  <ZSProvider>
    <CacheProvider value={createCKCache()}>
      <ThemeProvider theme={zslabsTheme}>{element}</ThemeProvider>
    </CacheProvider>
  </ZSProvider>
);

wrapRootElement.propTypes = {
  element: PropTypes.node.isRequired,
};
