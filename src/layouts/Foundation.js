import { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import useMount from 'react-use/lib/useMount';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import 'what-input';
import { TimelineMax } from 'gsap/TweenMax';
import rootUnits from 'root-units';
import { withTheme } from 'emotion-theming';
import { Container } from 'chaoskit/src/components';
import { misc } from 'chaoskit/src/assets/styles/utility';

import Link from '../components/Link';
import AboutModal from '../components/AboutModal';
import ArticlesOffCanvas from '../components/ArticlesOffCanvas';

import me from '../assets/media/me.png';
import logo from '../assets/media/logo.svg';
import pattern from '../assets/media/pattern.png';

// Get more reliable viewport units
rootUnits.install();

const Foundation = ({ children, runAnimation, theme }) => {
  const logoRef = useRef();
  const menuRef = useRef();
  const aboutRef = useRef();

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
      [logoRef.current, menuRef.current, aboutRef.current],
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
      <Container size="small">
        <header
          css={[
            misc.fluidSize({
              theme,
              property: 'paddingBottom',
              from: theme.space.large,
              to: theme.space.xlarge,
            }),
            {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: theme.space.base,

              '> * > *': {
                display: 'inline-block',
                transition: `transform ${theme.timing.base} ${theme.transition.bounce}`,
                transformOrigin: 'center center',
                backfaceVisibility: 'hidden',

                '&:hover, &:focus': {
                  transform: 'scale(1.15)',
                },
              },
            },

            runAnimation && {
              // GSAP
              '> *': {
                transform: `translateY(calc(-100% + ${theme.space.base}px))`,
                opacity: 0,
              },
            },
          ]}
        >
          <div ref={logoRef}>
            <Link
              to="/"
              title={title}
              css={{
                width: theme.height.xsmall,
                height: theme.height.base,
                maskImage: `url(${logo})`,
                maskSize: 'contain',
                maskPosition: 'center',
                background: `url(${pattern}) no-repeat -800px -575px`,
                backgroundSize: '1500px 1000px',
              }}
            />
          </div>
          <div ref={menuRef}>
            <ArticlesOffCanvas articles={articles} />
          </div>
          <div
            ref={aboutRef}
            css={{
              justifyContent: 'flex-end',
            }}
          >
            <AboutModal />
          </div>
        </header>
        <main>{children}</main>
      </Container>
    </Fragment>
  );
};

Foundation.propTypes = {
  runAnimation: PropTypes.bool,
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(Foundation);
