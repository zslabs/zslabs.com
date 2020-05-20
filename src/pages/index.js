import { useEffect, useRef, useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import gsap from 'gsap'
import {
  Button,
  Container,
  Inline,
  Row,
  RowColumn,
  Section,
  SectionTitle,
  ListItem,
} from 'chaoskit/src/components'
import { link, misc } from 'chaoskit/src/assets/styles/utility'
import { generateGradient } from 'chaoskit/src/assets/styles/utility/gradient'
import { useTheme } from 'emotion-theming'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { backgroundDots, buttonBase, titleStyles } from '~helpers'
import Foundation from '~layouts/Foundation'
import pattern from '~media/pattern.png'
import Link from '~components/Link'
import { ZSContext } from '~components/ZSContext'
import { BubbleList, BubbleListItem } from '~components/BubbleList'

const Index = () => {
  const { dispatch } = useContext(ZSContext)

  const introTitle = useRef()
  const introTitleSub = useRef()
  const articleButtonRef = useRef()
  const experienceButtonRef = useRef()
  const projectsRef = useRef()
  const latestArticleRef = useRef()

  const theme = useTheme()

  const {
    latestArticle: {
      edges: [latestArticle],
    },
    projects: {
      childMdx: { frontmatter: pageData },
    },
  } = useStaticQuery(graphql`
    query IndexPageData {
      latestArticle: allMdx(
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

      projects: file(
        name: { eq: "projects" }
        absolutePath: { regex: "/src/data/" }
      ) {
        childMdx {
          frontmatter {
            projects {
              title
              url
              blurb
            }
          }
        }
      }
    }
  `)

  const runAnimation = () => {
    const pageTimeline = gsap.timeline({
      delay: 1,
    })

    pageTimeline
      .to(introTitle.current, {
        duration: 0.5,
        y: 0,
        opacity: 1,
        ease: theme.gsap.transition.bounce,
      })
      .to(introTitleSub.current, {
        duration: 0.5,
        y: 0,
        opacity: 1,
        ease: theme.gsap.transition.bounce,
      })
      .to(
        articleButtonRef.current,
        {
          duration: 0.5,
          scale: 1,
          opacity: 1,
          ease: theme.gsap.transition.bounce,
        },
        'introButtons'
      )
      .to(
        experienceButtonRef.current,
        {
          duration: 0.75,
          delay: 0.125,
          scale: 1,
          opacity: 1,
          ease: theme.gsap.transition.bounce,
        },
        'introButtons'
      )
      .to(latestArticleRef.current, {
        duration: 0.25,
        opacity: 1,
      })
      .to(projectsRef.current, {
        duration: 0.25,
        delay: 0.25,
        opacity: 1,
        y: 0,
        ease: theme.gsap.transition.bounce,
      })
  }

  useEffect(() => {
    runAnimation()
  }, [])

  return (
    <Foundation runAnimation>
      <Section size="xlarge">
        <div css={{ textAlign: 'center' }}>
          <h5
            css={{
              ...theme.fontSize.medium__fluid,
              color: theme.fontColor.muted,
              marginBottom: theme.space.small,
              // GSAP
              opacity: 0,
              transform: 'translateY(100%)',
            }}
            ref={introTitleSub}
          >
            Full-Stack/Motion Developer
          </h5>
          <h1
            css={{
              marginTop: 0,
              ...misc.fluidSize({
                theme,
                property: 'fontSize',
                from: theme.fontSize.h1,
                to: theme.fontSize.h1 * 1.5,
              }),
              // GSAP
              opacity: 0,
              transform: 'translateY(50%)',
            }}
            ref={introTitle}
          >
            Zach Schnackel
          </h1>
        </div>
        <div css={{ marginTop: theme.space.large }}>
          <Inline size="medium" css={{ justifyContent: 'center' }}>
            <ListItem>
              <div
                css={{
                  // GSAP
                  transformOrigin: 'center center',
                  transform: 'scale(0)',
                  opacity: 0,
                }}
                ref={articleButtonRef}
              >
                <Button
                  onClick={() => {
                    dispatch({
                      type: 'toggleOffCanvas',
                    })
                  }}
                  css={buttonBase(theme, { type: 'primary' })}
                >
                  Articles
                </Button>
              </div>
            </ListItem>
            <ListItem>
              <div
                css={{
                  // GSAP
                  transformOrigin: 'center center',
                  transform: 'scale(0)',
                  opacity: 0,
                }}
                ref={experienceButtonRef}
              >
                <Button
                  as={Link}
                  css={buttonBase(theme, { type: 'secondary' })}
                  to="/experience/"
                >
                  Experience
                </Button>
              </div>
            </ListItem>
          </Inline>
        </div>
        <Link
          to={latestArticle.node.fields.fullUrl}
          ref={latestArticleRef}
          css={[
            misc.fluidSize({
              theme,
              property: 'marginTop',
              from: theme.space.xlarge,
              to: theme.space.xlarge * 1.5,
            }),
            link.reset(theme),
            {
              textAlign: 'center',
              display: 'inline-flex',
              flexDirection: 'column',
              padding: theme.space.base,
              position: 'relative',
              left: '50%',
              zIndex: 1,
              transform: 'translateX(-50%)',
              transition: `transform ${theme.timing.base} ${theme.transition.bounce}`,

              // GSAP
              opacity: 0,

              '&:hover, &:focus': {
                transform: 'translateX(-50%) scale(1.05)',
              },

              '&::before, &::after': {
                content: "''",
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: generateGradient({
                  start: theme.color.light.base,
                  stop: theme.color.panel.base,
                  position: 'to bottom right',
                }),
                transform: 'skew(-15deg)',
              },

              '&::before': {
                zIndex: -1,
              },

              '&::after': {
                zIndex: -2,
                backgroundImage: `url(${pattern})`,
                backgroundPosition: '-600px -575px',
                backgroundSize: '1500px 1000px',
                backgroundRepeat: 'no-repeat',
                opacity: theme.opacity.base,
                transform: `skew(-15deg) translate(-${theme.space.small}px, -${theme.space.small}px)`,
              },

              [theme.mq.small]: {
                minWidth: `calc(${theme.breakpoint.small}px * 0.75)`,
              },
            },
          ]}
        >
          <div>
            <span
              css={{ fontSize: theme.fontSize.medium }}
              role="img"
              aria-label="Hooray!"
            >
              🎉
            </span>{' '}
            Check out my latest article:
          </div>
          <div css={{ fontWeight: theme.fontWeight.bold }}>
            {latestArticle.node.frontmatter.title}
          </div>
        </Link>
      </Section>
      <Section
        id="recent-projects"
        css={{
          position: 'relative',
          left: '50%',
          margin: `0 calc(var(--rw) / -2)`,
          right: '50%',
          width: 'var(--rw)',

          '&::before': {
            ...backgroundDots(theme.fontColor.muted),
            zIndex: -2,
          },
        }}
      >
        <div
          css={{
            // GSAP
            opacity: 0,
            transform: 'translateY(10%)',
          }}
          ref={projectsRef}
        >
          <Container
            css={{
              paddingLeft: `${theme.space.base}px !important`,
              paddingRight: `${theme.space.base}px !important`,
            }}
            size="small"
          >
            <SectionTitle
              as="h2"
              title="Recent Projects"
              css={{
                '.CK__SectionTitle__Header': [
                  titleStyles(theme),

                  {
                    '&::before': {
                      clipPath: 'polygon(0 100%, 0 0, 100% 0)',
                      backgroundPosition: '-200px -75px',
                    },
                  },
                ],
              }}
            />
            <Row css={{ justifyContent: 'center' }}>
              <RowColumn size={{ medium: 9 }}>
                <BubbleList>
                  {pageData.projects.map((project) => (
                    <BubbleListItem
                      key={project.title}
                      title={project.title}
                      url={{
                        to: project.url,
                      }}
                    >
                      <MDXRenderer>{project.blurb}</MDXRenderer>
                    </BubbleListItem>
                  ))}
                </BubbleList>
              </RowColumn>
            </Row>
          </Container>
        </div>
      </Section>
    </Foundation>
  )
}

export default Index
