import { useRef } from 'react';
import PropTypes from 'prop-types';
import useMount from 'react-use/lib/useMount';
import { useStaticQuery, graphql } from 'gatsby';
import { TimelineMax } from 'gsap/TweenMax';
import { Button, Inline, List, ListItem } from 'chaoskit/src/components';
import { withTheme } from 'emotion-theming';

import Foundation from '../layouts/Foundation';
import Link from '../components/Link';
import { config } from '../helpers/config';

const Index = ({ theme }) => {
  const introTitle = useRef();
  const introTitleSub = useRef();
  const articleButtonRef = useRef();
  const experienceButtonRef = useRef();
  const projectsRef = useRef();
  const latestArticleRef = useRef();

  console.log({ theme });

  const {
    latestArticle: {
      edges: [latestArticle],
    },
    projects: { childDataYaml: pageData },
  } = useStaticQuery(graphql`
    query IndexPageData {
      latestArticle: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: {
          fileAbsolutePath: { regex: "/src/articles/" }
          frontmatter: { title: { ne: "BLUEPRINT" } }
        }
        limit: 1
      ) {
        edges {
          node {
            frontmatter {
              title
            }
            fields {
              fullUrl
            }
          }
        }
      }

      projects: file(name: { eq: "projects" }) {
        childDataYaml {
          projects {
            title
            url
            description
          }
        }
      }
    }
  `);

  const runAnimation = () => {
    const pageTimeline = new TimelineMax({
      delay: 1,
    });

    pageTimeline
      .to(introTitle.current, 0.5, {
        y: 0,
        autoAlpha: 1,
        ease: config.ease,
      })
      .to(introTitleSub.current, 0.5, {
        y: 0,
        autoAlpha: 1,
        ease: config.ease,
      })
      .to(
        articleButtonRef.current,
        0.5,
        {
          scale: 1,
          autoAlpha: 1,
          ease: config.ease,
        },
        'introButtons'
      )
      .to(
        experienceButtonRef.current,
        0.75,
        {
          delay: 0.125,
          scale: 1,
          autoAlpha: 1,
          ease: config.ease,
        },
        'introButtons'
      )
      .to(latestArticleRef.current, 0.25, {
        autoAlpha: 1,
      })
      .to(projectsRef.current, 0.5, {
        delay: 0.25,
        autoAlpha: 1,
      });
  };

  useMount(() => {
    runAnimation();
  });

  return (
    <Foundation>
      <section className="section section--full section--large">
        <div className="container u-ph--regular">
          <div className="u-textCenter">
            <h5
              className="intro-titleSub u-textMuted u-textFluid--medium u-mb--small"
              ref={introTitleSub}
            >
              Full-Stack/Motion Developer
            </h5>
            <h1 className="intro-title u-mt--remove" ref={introTitle}>
              Zach Schnackel
            </h1>
          </div>
          <div className="u-mt--large">
            <Inline size="medium" className="u-flexCenter">
              <div className="intro-buttonWrapper" ref={articleButtonRef}>
                <Button
                  onClick={() => console.log('open articles')}
                  type="primary"
                >
                  Articles
                </Button>
              </div>
              <div className="intro-buttonWrapper" ref={experienceButtonRef}>
                <Button type="secondary" url="/experience/">
                  Experience
                </Button>
              </div>
            </Inline>
          </div>
          <Link
            className="u-linkDefault home__latestArticle"
            to={latestArticle.node.fields.fullUrl}
            ref={latestArticleRef}
          >
            <div>
              <span className="u-textMedium" role="img" aria-label="Hooray!">
                🎉
              </span>{' '}
              Check out my latest article:
            </div>
            <div className="u-textBold">
              {latestArticle.node.frontmatter.title}
            </div>
          </Link>
        </div>
      </section>
      <section
        ref={projectsRef}
        id="recent-projects"
        className="section section--full section--projects"
      >
        <div className="container u-ph--regular">
          <div className="section-titleWrapper">
            <h2 className="section-title">Recent Projects</h2>
          </div>
          <div className="row u-flexCenter">
            <div className="column-10@small column-8@medium">
              <List className="bubbleList">
                {pageData.projects.map(project => (
                  <ListItem className="bubbleList-item" key={project.title}>
                    <div className="bubbleList-item-bubble" />
                    <div className="bubbleList-item-info">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bubbleList-item-link"
                        href={project.url}
                      >
                        {project.title}
                      </a>
                      <p className="u-mt--remove u-textMedium">
                        {project.description}
                      </p>
                    </div>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        </div>
      </section>
    </Foundation>
  );
};

Index.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme(Index);
