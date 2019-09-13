import { renderToString } from 'react-dom/server';
import { ThemeProvider } from 'emotion-theming';
import { CacheProvider } from '@emotion/core';
import { extractCritical } from 'emotion-server';
import { ckCache } from 'chaoskit/src/helpers/Wrapper';

import { ZSProvider } from './src/components/ZSContext';
import { zslabsTheme } from './utils/theme';

export const replaceRenderer = ({
  replaceBodyHTMLString,
  bodyComponent,
  setHeadComponents,
}) => {
  const { html, ids, css } = extractCritical(
    renderToString(
      <ZSProvider>
        <CacheProvider value={ckCache}>
          <ThemeProvider theme={zslabsTheme}>{bodyComponent}</ThemeProvider>
        </CacheProvider>
      </ZSProvider>
    )
  );
  setHeadComponents([
    <style
      data-emotion-css={ids.join(' ')}
      dangerouslySetInnerHTML={{
        __html: css,
      }}
    />,
  ]);
  replaceBodyHTMLString(html);
};
