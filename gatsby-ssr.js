import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { CacheProvider, Global } from '@emotion/core';
import { ckCache } from 'chaoskit/src/helpers/Wrapper';

import { globalStyles } from 'chaoskit/src/assets/styles/global';

import { ZSProvider } from './src/components/ZSContext';
import { global } from './src/assets/styles/global';
import { fonts } from './src/assets/styles/fonts';
import { zslabsTheme } from './utils/theme';

export const wrapRootElement = ({ element }) => (
  <ZSProvider>
    <CacheProvider value={ckCache}>
      <ThemeProvider theme={zslabsTheme}>
        <Global
          styles={[
            globalStyles(zslabsTheme),
            global(zslabsTheme),
            fonts(zslabsTheme),
          ]}
        />
        {element}
      </ThemeProvider>
    </CacheProvider>
  </ZSProvider>
);

wrapRootElement.propTypes = {
  element: PropTypes.node.isRequired,
};
