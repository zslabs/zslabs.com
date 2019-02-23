import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { TimelineMax } from 'gsap/TweenMax';
import {
  Button, Inline, List, ListItem,
} from 'chaoskit/src/components';

import Foundation from '../layouts/Foundation';
import { config } from '../helpers/config';

const Index = (props) => {
  const introTitle = React.createRef();
  const introTitleSub = React.createRef();
  const articleButtonRef = React.createRef();
  const experienceButtonRef = React.createRef();
  const projectsRef = React.createRef();

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
        'introButtons',
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
        'introButtons',
      )
      .to(projectsRef.current, 0.5, {
        autoAlpha: 1,
      });
  };

  const {
    data: {
      projects: { childDataYaml: pageData },
    },
  } = props;

  useEffect(() => {
    runAnimation();
  }, []);

  return (
    <Foundation
      runAnimation
      render={renderProps => (
        <Fragment>
          <section className="section section--full section--large">
            <div className="container u-ph--regular">
              <div className="u-textCenter">
                <h5
                  className="intro-titleSub u-textMuted u-textFluid--medium u-mb--small"
                  ref={introTitleSub}
                >
                  UI/Motion Developer
                </h5>
                <h1 className="intro-title u-mt--remove" ref={introTitle}>
                  Zach Schnackel
                </h1>
              </div>
              <div className="u-mt--large">
                <Inline size="medium" className="u-flexCenter">
                  <div className="intro-buttonWrapper" ref={articleButtonRef}>
                    <Button
                      onClick={renderProps.handleArticlesOffCanvasToggle}
                      type="primary"
                    >
                      Articles
                    </Button>
                  </div>
                  <div
                    className="intro-buttonWrapper"
                    ref={experienceButtonRef}
                  >
                    <Button type="secondary" url="/experience/">
                      Experience
                    </Button>
                  </div>
                </Inline>
              </div>
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
        </Fragment>
      )}
    />
  );
};

Index.propTypes = {
  data: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query IndexPageData {
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
`;

export default Index;
