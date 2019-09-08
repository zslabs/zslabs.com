import PropTypes from 'prop-types';
import cx from 'classnames';
import useMount from 'react-use/lib/useMount';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import 'what-input';
import { TimelineMax } from 'gsap/TweenMax';
import { ThemeProvider } from 'emotion-theming';
import { CacheProvider, Global } from '@emotion/core';
import { ckCache } from 'chaoskit/src/helpers/Wrapper';
import { theme } from 'chaoskit/src/assets/styles/theme';
import { globalStyles } from 'chaoskit/src/assets/styles/global';
import { merge } from 'lodash-es';
import { shade, tint } from 'polished';
import rootUnits from 'root-units';

import { Provider } from '../components/Context';
import Link from '../components/Link';
import AboutModal from '../components/AboutModal';
import ArticlesOffCanvas from '../components/ArticlesOffCanvas';
import { global } from '../assets/styles/global';
import { fonts } from '../assets/styles/fonts';
import { config } from '../helpers/config';

import me from '../assets/media/me.png';

// Get more reliable viewport units
rootUnits.install();

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
  fontFamily: {
    base: "Calibre, 'Helvetica Neue', Arial, sans-serif",
    heading: "Calibre, 'Helvetica Neue', Arial, sans-serif",
  },
});

const Foundation = ({ children, runAnimation }) => {
  const {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    articles: { edges: articles },
  } = useStaticQuery(
    graphql`
      query FoundationPageData {
        site: site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }

        articles: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: {
            fileAbsolutePath: { regex: "/src/articles/" }
            frontmatter: { title: { ne: "BLUEPRINT" } }
          }
        ) {
          totalCount
          edges {
            node {
              fileAbsolutePath
              html
              timeToRead
              frontmatter {
                title
                date
                slug
              }
              fields {
                slug
                fullUrl
              }
            }
          }
        }
      }
    `
  );

  const runAnimationFunc = () => {
    const pageTimeline = new TimelineMax({
      delay: 0.5,
    });

    pageTimeline.staggerTo(
      '.header  > *',
      0.5,
      {
        y: 0,
        autoAlpha: 1,
        ease: config.ease,
      },
      0.1
    );
  };

  useMount(() => {
    if (runAnimation) runAnimationFunc();
  });

  const headerClasses = cx('header', {
    'has-animation': runAnimation,
  });

  return (
    <CacheProvider value={ckCache}>
      <ThemeProvider theme={zslabsTheme}>
        <Global
          styles={[
            globalStyles(zslabsTheme),
            global(zslabsTheme),
            fonts(zslabsTheme),
          ]}
        />
        <Provider>
          <Helmet
            title={title}
            meta={[
              { name: 'description', content: description },
              { name: 'og:image', content: `${siteUrl}${me}` },
            ]}
            htmlAttributes={{
              lang: 'en',
            }}
          />
          <div className="site-wrapper">
            <div className="container container--small">
              <header className={headerClasses}>
                <div>
                  <Link to="/" className="header-logo" title={title} />
                </div>
                <div>
                  <ArticlesOffCanvas articles={articles} />
                </div>
                <div>
                  <AboutModal />
                </div>
              </header>
              <main>{children}</main>
            </div>
          </div>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
};

Foundation.propTypes = {
  runAnimation: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Foundation;
