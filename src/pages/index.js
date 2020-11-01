import { useStaticQuery, graphql } from 'gatsby'
import {
  Container,
  Inline,
  Section,
  SectionTitle,
  ListItem,
} from 'chaoskit/src/components'
import { link, misc } from 'chaoskit/src/assets/styles/utility'
import { generateGradient } from 'chaoskit/src/assets/styles/utility/gradient'
import { useTheme } from 'emotion-theming'
import { motion, useAnimation } from 'framer-motion'

import { backgroundDots, titleStyles } from '~helpers'
import Foundation from '~layouts/Foundation'
import pattern from '~media/pattern.png'
import Link from '~components/Link'
import { BubbleList, BubbleListItem } from '~components/BubbleList'
import useArticlesOffCanvasState from '~hooks/useArticlesOffCanvasState'
import StyledButton from '~components/StyledButton'
import Data from '~components/Data'

const Index = () => {
  const theme = useTheme()

  const toggle = useArticlesOffCanvasState((state) => state.toggle)

  const introTitleVariants = {
    hidden: {
      y: '50%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  const introTitleSubVariants = {
    hidden: {
      y: theme.space.medium,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  const buttonVariants = {
    hidden: {
      scale: 0.5,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
    },
  }

  const latestArticleVariants = {
    hidden: {
      scale: 0.5,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
    },
  }
  const projectsVariants = {
    hidden: {
      y: theme.space.large,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  const footerVariants = {
    hidden: {
      y: theme.space.large,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  const introTitleControls = useAnimation()
  const introTitleSubControls = useAnimation()
  const buttonControls = useAnimation()
  const latestArticleControls = useAnimation()
  const projectsControls = useAnimation()
  const footerControls = useAnimation()

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

  const pageAnimation = async () => {
    await introTitleControls.start('visible')

    await introTitleSubControls.start('visible')

    await buttonControls.start('visible')

    await latestArticleControls.start('visible')

    await projectsControls.start('visible')

    footerControls.start('visible')
  }

  const introTitleSub = 'Full-Stack/Motion Developer'

  return (
    <Foundation
      runAnimation
      onAfterAnimation={pageAnimation}
      footerMotion={{
        variants: footerVariants,
        controls: footerControls,
      }}
    >
      <Section size="xlarge">
        <div css={{ textAlign: 'center' }}>
          <h5
            css={{
              ...theme.fontSize.medium__fluid,
              color: theme.fontColor.muted,
              marginBottom: theme.space.small,
            }}
          >
            {Array.from(introTitleSub).map((character, index) => {
              const key = `${character}-${index}`

              return (
                <motion.span
                  key={key}
                  css={{
                    display: 'inline-block',
                  }}
                  initial="hidden"
                  transition={{
                    delay: index * 0.025,
                    ...theme.motion.transition.spring,
                  }}
                  animate={introTitleSubControls}
                  variants={introTitleSubVariants}
                >
                  {character.trim().length > 0 ? character : '\u00a0'}
                </motion.span>
              )
            })}
          </h5>
          <motion.h1
            css={{
              marginTop: 0,
              ...misc.fluidSize({
                theme,
                property: 'fontSize',
                from: theme.fontSize.h1,
                to: theme.fontSize.h1 * 1.5,
              }),
            }}
            initial="hidden"
            variants={introTitleVariants}
            animate={introTitleControls}
          >
            Zach Schnackel
          </motion.h1>
        </div>
        <div css={{ marginTop: theme.space.large }}>
          <Inline size="medium" css={{ justifyContent: 'center' }}>
            <ListItem>
              <motion.div
                initial="hidden"
                variants={buttonVariants}
                animate={buttonControls}
                transition={{
                  ...theme.motion.transition.springX,
                }}
              >
                <StyledButton onClick={toggle} variation="primary">
                  Articles
                </StyledButton>
              </motion.div>
            </ListItem>
            <ListItem>
              <motion.div
                initial="hidden"
                variants={buttonVariants}
                animate={buttonControls}
                transition={{
                  delay: theme.motion.timing.short,
                  ...theme.motion.transition.springX,
                }}
              >
                <StyledButton as={Link} variation="secondary" to="/experience/">
                  Experience
                </StyledButton>
              </motion.div>
            </ListItem>
          </Inline>
        </div>
        <motion.div
          initial="hidden"
          variants={latestArticleVariants}
          animate={latestArticleControls}
        >
          <Link
            to={latestArticle.node.fields.fullUrl}
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
        </motion.div>
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
        <motion.div
          initial="hidden"
          variants={projectsVariants}
          animate={projectsControls}
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
            <div
              css={{
                [theme.mq.medium]: {
                  display: 'grid',
                  gridTemplateColumns: '0.75fr',
                  justifyContent: 'center',
                },
              }}
            >
              <BubbleList>
                {pageData.projects.map((project) => (
                  <BubbleListItem
                    key={project.title}
                    title={project.title}
                    url={project.url}
                  >
                    <Data>{project.blurb}</Data>
                  </BubbleListItem>
                ))}
              </BubbleList>
            </div>
          </Container>
        </motion.div>
      </Section>
    </Foundation>
  )
}

export default Index
