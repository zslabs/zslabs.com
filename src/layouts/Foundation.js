import { Fragment, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import 'what-input'
import gsap from 'gsap'
import rootUnits from 'root-units'
import { Global } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { Container } from 'chaoskit/src/components'
import { misc } from 'chaoskit/src/assets/styles/utility'
import { globalStyles } from 'chaoskit/src/assets/styles/global'

import { global } from '~styles/global'
import { fonts } from '~styles/fonts'
import logo from '~media/logo.svg'
import pattern from '~media/pattern.png'
import Link from '~components/Link'
import AboutModal from '~components/AboutModal'
import ArticlesOffCanvas from '~components/ArticlesOffCanvas'
import HelmetSEO from '~components/HelmetSEO'
import Footer from '~components/Footer'

const Foundation = ({
  children,
  onAfterAnimation = () => {},
  runAnimation,
}) => {
  const logoRef = useRef()
  const menuRef = useRef()
  const aboutRef = useRef()

  const theme = useTheme()

  const {
    site: {
      siteMetadata: { title },
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

  const runAnimationFunc = async () => {
    const pageTimeline = gsap.timeline({
      delay: 0.25,
    })

    await pageTimeline.to(
      [logoRef.current, menuRef.current, aboutRef.current],
      {
        duration: 0.5,
        y: 0,
        yPercent: 0, // Both are required in this case https://github.com/greensock/GSAP/issues/330#issuecomment-562429618
        opacity: 1,
        ease: theme.gsap.transition.bounce,
        stagger: 0.1,
      }
    )

    onAfterAnimation()
  }

  useEffect(() => {
    // Get more reliable viewport units
    rootUnits.install()

    if (runAnimation) {
      runAnimationFunc()
    }
  }, [])

  return (
    <Fragment>
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

            runAnimation && {
              // GSAP
              '.ZS__Header__ItemWrapper': {
                transform: `translateY(calc(-100% + ${theme.space.base}px))`,
                opacity: 0,
              },
            },
          ]}
        >
          <div className="ZS__Header__ItemWrapper" ref={logoRef}>
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
          </div>
          <div className="ZS__Header__ItemWrapper" ref={menuRef}>
            <ArticlesOffCanvas articles={articles} />
          </div>
          <div
            className="ZS__Header__ItemWrapper"
            ref={aboutRef}
            css={{
              justifyContent: 'flex-end',
            }}
          >
            <AboutModal />
          </div>
        </header>
        <main>{children}</main>
        <Footer runAnimation={runAnimation} />
      </Container>
    </Fragment>
  )
}

Foundation.propTypes = {
  runAnimation: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onAfterAnimation: PropTypes.func,
}

export default Foundation
