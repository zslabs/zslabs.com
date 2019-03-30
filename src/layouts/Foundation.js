import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import useMount from 'react-use/lib/useMount';
import useToggle from 'react-use/lib/useToggle';
import { StaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import 'what-input';
import {
  Button,
  Close,
  Inline,
  List,
  ListItem,
  Modal,
  ModalBody,
  OffCanvas,
} from 'chaoskit/src/components';
import { TimelineMax } from 'gsap/TweenMax';

import { Icon, Link } from '../components';
import { config } from '../helpers/config';

import me from '../assets/media/me.png';
import '../assets/styles/site.scss';

const Foundation = (props) => {
  const {
    data: {
      site: {
        siteMetadata: { title, description, siteUrl },
      },
      articles: { edges: articles },
    },
    render,
    runAnimation,
  } = props;

  const [isAboutModalOpen, toggleAboutModalOpen] = useToggle(false);
  const [isArticlesOffCanvasOpen, toggleArticlesOffCanvasOpen] = useToggle(
    false,
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
      0.1,
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
      />
      <div className="site-wrapper">
        <div className="container container--small">
          <header className={headerClasses}>
            <div>
              <Link to="/" className="header-logo" title={title} />
            </div>
            <div>
              <Button
                type="reset"
                className="header-menu"
                onClick={toggleArticlesOffCanvasOpen}
              >
                <Icon icon="menu" />
              </Button>
              <OffCanvas
                open={isArticlesOffCanvasOpen}
                onOffCanvasToggle={toggleArticlesOffCanvasOpen}
              >
                <h2 className="offCanvas-title">Articles</h2>
                <List className="bubbleList">
                  {articles.map(({ node }) => (
                    <ListItem
                      key={node.frontmatter.title}
                      className="bubbleList-item"
                    >
                      <div className="bubbleList-item-bubble" />
                      <div className="bubbleList-item-info">
                        <Link
                          className="bubbleList-item-link"
                          to={node.fields.fullUrl}
                        >
                          {node.frontmatter.title}
                        </Link>
                        <p className="u-mt--remove u-textMedium u-textMuted">
                          {moment(node.frontmatter.date).format('LL')}
                        </p>
                      </div>
                    </ListItem>
                  ))}
                </List>
              </OffCanvas>
            </div>
            <div>
              <Button
                type="reset"
                className="header-about"
                onClick={toggleAboutModalOpen}
              >
                <img src={me} alt={title} />
              </Button>
              <Modal
                open={isAboutModalOpen}
                handleOutsideModalClick={toggleAboutModalOpen}
              >
                <ModalBody>
                  <Close
                    onClick={() => toggleAboutModalOpen()}
                    className="aboutModal-close"
                  />
                  <img src={me} className="aboutModal-image" alt={title} />
                  <h3 className="u-textCenter u-mb--small">
                    Hi, I&apos;m Zach
                  </h3>
                  <Inline size="medium" className="u-flexCenter">
                    <Button
                      url="https://www.github.com/zslabs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aboutModal-social--github"
                      iconOnly
                      title="GitHub"
                    >
                      <Icon icon="github" />
                    </Button>
                    <Button
                      url="https://www.codepen.io/zslabs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aboutModal-social--codepen"
                      iconOnly
                      title="CodePen"
                    >
                      <Icon icon="codepen" />
                    </Button>
                    <Button
                      url="https://www.twitter.com/zslabs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aboutModal-social--twitter"
                      iconOnly
                      title="Twitter"
                    >
                      <Icon icon="twitter" />
                    </Button>
                  </Inline>
                  <p className="u-mv--large">
                    I create buttons, borders, and other groovy things at{' '}
                    <a
                      href="https://www.gremlin.com"
                      className="u-textUnderline u-textDefault"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Gremlin
                    </a>
                    . I work with techologies like{' '}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://reactjs.org"
                      className="u-textUnderline u-textDefault"
                    >
                      ReactJS
                    </a>
                    ,{' '}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://gatsbyjs.org"
                      className="u-textUnderline u-textDefault"
                    >
                      GatsbyJS
                    </a>
                    ,{' '}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://nextjs.org"
                      className="u-textUnderline u-textDefault"
                    >
                      Next.JS
                    </a>
                    , and{' '}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://nodejs.org"
                      className="u-textUnderline u-textDefault"
                    >
                      NodeJS
                    </a>
                    . My background involves pushing the limits of what we can
                    build on the backend and how we can experience it on the
                    frontend. My passions are perfecting process and educating
                    those around me.
                  </p>
                  <h4 className="u-textFluid--xlarge">Speaking/Consulting</h4>
                  <p>
                    Have an event and/or consluting project you&apos;d like me
                    to be a part of? Awesome!{' '}
                    <a
                      className="u-textUnderline u-textDefault"
                      href="mailto:info@zslabs.com"
                    >
                      Let&apos;s chat
                    </a>
                    .
                  </p>
                  <h4 className="u-textFluid--xlarge">
                    How&apos;d you build this site?!
                  </h4>
                  <p>
                    Because I love open-source—it&apos;s available for anyone to
                    view. Find a bug? Report it!{' '}
                    <a
                      className="u-textUnderline u-textDefault"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://github.com/zslabs/zslabs.com"
                    >
                      View source
                    </a>
                    .
                  </p>
                  <div className="u-mt--large u-textCenter">
                    <span className="u-textMuted">
                      Copyright © {new Date().getFullYear()} Zach Schnackel.
                      Penalty is
                    </span>{' '}
                    🔥
                  </div>
                </ModalBody>
              </Modal>
            </div>
          </header>
          <main>
            {render({
              toggleArticlesOffCanvasOpen,
            })}
          </main>
        </div>
      </div>
    </Fragment>
  );
};

Foundation.propTypes = {
  render: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  runAnimation: PropTypes.bool,
};

export default props => (
  <StaticQuery
    query={graphql`
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
    `}
    render={data => <Foundation data={data} {...props} />}
  />
);
