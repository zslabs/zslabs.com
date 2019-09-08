import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { CacheProvider, Global } from '@emotion/core';
import { ckCache } from 'chaoskit/src/helpers/Wrapper';
import { theme } from 'chaoskit/src/assets/styles/theme';
import { globalStyles } from 'chaoskit/src/assets/styles/global';
import { merge } from 'lodash-es';
import { shade, tint } from 'polished';

import { ZSProvider } from './src/components/ZSContext';
import { global } from './src/assets/styles/global';
import { fonts } from './src/assets/styles/fonts';

// Handy-dandy utility function to deep-merge themes
function extendTheme(...themes) {
  return merge({}, ...themes);
}

const zslabsTheme = extendTheme(theme, {
  color: {
    primary: {
      base: '#1d8cf5',
      get light() {
        return tint(0.9, this.base);
      },
      get dark() {
        return shade(0.1, this.base);
      },
      filter:
        'invert(36%) sepia(94%) saturate(1614%) hue-rotate(194deg) brightness(103%) contrast(92%)',
    },
  },
  warning: {
    base: '#fcd000',
    get light() {
      return tint(0.95, this.base);
    },
    get dark() {
      return shade(0.05, this.base);
    },
    filter:
      'invert(80%) sepia(79%) saturate(3799%) hue-rotate(354deg) brightness(97%) contrast(105%)',
  },
  danger: {
    base: '#f25041',
    get light() {
      return tint(0.95, this.base);
    },
    get dark() {
      return shade(0.05, this.base);
    },
    filter:
      'invert(64%) sepia(92%) saturate(5728%) hue-rotate(339deg) brightness(101%) contrast(90%)',
  },
  fontFamily: {
    base: "Calibre, 'Helvetica Neue', Arial, sans-serif",
    heading: "Calibre, 'Helvetica Neue', Arial, sans-serif",
  },
});

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
