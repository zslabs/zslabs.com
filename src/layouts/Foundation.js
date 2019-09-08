import { Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import useMount from 'react-use/lib/useMount';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import 'what-input';
import { TimelineMax } from 'gsap/TweenMax';
import rootUnits from 'root-units';
import { withTheme } from 'emotion-theming';

import Link from '../components/Link';
import AboutModal from '../components/AboutModal';
import ArticlesOffCanvas from '../components/ArticlesOffCanvas';

import me from '../assets/media/me.png';

// Get more reliable viewport units
rootUnits.install();

const Foundation = ({ children, runAnimation, theme }) => {
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
        ease: theme.gsap.transition.bounce,
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
    <Fragment>
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
    </Fragment>
  );
};

Foundation.propTypes = {
  runAnimation: PropTypes.bool,
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(Foundation);
