import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useStaticQuery, graphql } from 'gatsby'
import 'what-input'
import rootUnits from 'root-units'
import { Global, useTheme } from '@emotion/react'
import { Container } from 'chaoskit/src/components'
import { misc } from 'chaoskit/src/assets/styles/utility'
import { globalStyles } from 'chaoskit/src/assets/styles/global'
import { motion, useAnimation } from 'framer-motion'

import { global } from '~styles/global'
import { fonts } from '~styles/fonts'
import logo from '~media/logo.svg'
import pattern from '~media/pattern.png'
import Link from '~components/Link'
import AboutModal from '~components/AboutModal'
import ArticlesOffCanvas from '~components/ArticlesOffCanvas'
import HelmetSEO from '~components/HelmetSEO'
import Footer from '~components/Footer'
import useSiteMetadata from '~hooks/useSiteMetadata'

const HeaderItemWrapper = (
  { runAnimation, className, controls, custom, ...rest },
  ref
) => {
  const theme = useTheme()

  const variants = {
    hidden: {
      opacity: 0,
      y: -theme.space.large,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <motion.div
      ref={ref}
      animate={controls}
      variants={variants}
      initial={runAnimation ? 'hidden' : false}
      transition={{
        delay: custom * 0.15,
        ...theme.motion.transition.springX,
      }}
      className={clsx('ZS__Header__ItemWrapper', className)}
      {...rest}
    />
  )
}

HeaderItemWrapper.propTypes = {
  className: PropTypes.string,
  controls: PropTypes.object.isRequired,
  custom: PropTypes.number.isRequired,
  runAnimation: PropTypes.bool,
}

const Foundation = ({
  children,
  onAfterAnimation = () => {},
  runAnimation,
  footerMotion,
}) => {
  const theme = useTheme()

  const { title } = useSiteMetadata()

  const controls = useAnimation()

  const {
    articles: { edges: articles },
  } = useStaticQuery(
    graphql`
      query FoundationPageData {
        articles: allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: {
            fileAbsolutePath: { regex: "/src/articles/" }
            frontmatter: { title: { ne: "BLUEPRINT" } }
          }
        ) {
          edges {
            node {
              fileAbsolutePath
              frontmatter {
                title
                date(formatString: "MMMM D, YYYY")
              }
              fields {
                fullUrl
              }
            }
          }
        }
      }
    `
  )

  React.useEffect(() => {
    // Get more reliable viewport units
    rootUnits.install()

    async function runAnimationFunc() {
      await controls.start('visible')

      onAfterAnimation()
    }

    if (runAnimation) {
      runAnimationFunc()
    }
  }, [controls, onAfterAnimation, runAnimation])

  return (
    <React.Fragment>
      <Global styles={[globalStyles(theme), global(theme), fonts(theme)]} />
      <HelmetSEO />
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

              '.ZS__Header__Item': {
                display: 'inline-block',
                transition: `transform ${theme.timing.base} ${theme.transition.bounce}`,
                transformOrigin: 'center center',
                backfaceVisibility: 'hidden',

                '&:hover, &:focus': {
                  transform: 'scale(1.15)',
                },
              },
            },
          ]}
        >
          <HeaderItemWrapper
            runAnimation={runAnimation}
            controls={controls}
            custom={1}
          >
            <Link
              className="ZS__Header__Item"
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
          </HeaderItemWrapper>
          <HeaderItemWrapper
            runAnimation={runAnimation}
            controls={controls}
            custom={2}
          >
            <ArticlesOffCanvas articles={articles} />
          </HeaderItemWrapper>
          <HeaderItemWrapper
            runAnimation={runAnimation}
            controls={controls}
            css={{
              justifyContent: 'flex-end',
            }}
            custom={3}
          >
            <AboutModal />
          </HeaderItemWrapper>
        </header>
        <main>{children}</main>
        <Footer footerMotion={footerMotion} />
      </Container>
    </React.Fragment>
  )
}

Foundation.propTypes = {
  runAnimation: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onAfterAnimation: PropTypes.func,
  footerMotion: PropTypes.object,
}

export default Foundation
