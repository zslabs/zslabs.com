import { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalBody,
  Close,
  Inline,
  ListItem,
} from 'chaoskit/src/components'
import { text, link } from 'chaoskit/src/assets/styles/utility'
import { useTheme } from '@emotion/react'

import Icon from './Icon'
import TextLink from './TextLink'
import StyledButton from './StyledButton'

import me from '~media/me-small.png'

const SocialButton = ({ variation, ...rest }) => (
  <StyledButton
    target="_blank"
    rel="noopener noreferrer nofollow"
    iconOnly
    variation={variation}
    {...rest}
  >
    <Icon icon={variation} />
  </StyledButton>
)

SocialButton.propTypes = {
  variation: PropTypes.string.isRequired,
}

const ModalLink = (props) => {
  const theme = useTheme()

  return <TextLink css={[text.underline, link.reset(theme)]} {...props} />
}

const SectionTitle = (props) => {
  const theme = useTheme()

  return <h4 css={{ ...theme.fontSize.xlarge__fluid }} {...props} /> // eslint-disable-line jsx-a11y/heading-has-content
}

const AboutModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const theme = useTheme()

  return (
    <Fragment>
      <StyledButton
        className="ZS__Header__Item"
        type="reset"
        onClick={() => setIsOpen(true)}
      >
        <img
          loading="lazy"
          src={me}
          alt="About"
          css={{
            width: theme.height.base,
            height: theme.height.base,
            borderRadius: theme.borderRadius.rounded,
            boxShadow: theme.boxShadow.large,
          }}
        />
      </StyledButton>
      <Modal open={isOpen} setIsOpen={setIsOpen}>
        <ModalBody>
          <Close
            onClick={() => setIsOpen(false)}
            css={{
              position: 'absolute',
              top: theme.space.large,
              right: theme.space.large,
            }}
          />
          <img
            loading="lazy"
            src={me}
            alt=""
            css={{
              width: theme.height.base * 2,
              height: theme.height.base * 2,
              borderRadius: theme.borderRadius.rounded,
              boxShadow: theme.boxShadow.large,
              position: 'relative',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
          <h3 css={{ textAlign: 'center', marginBottom: theme.space.small }}>
            Hi, I'm Zach
          </h3>
          <Inline
            size="medium"
            css={{
              justifyContent: 'center',
            }}
          >
            <ListItem>
              <SocialButton
                url="https://www.github.com/zslabs"
                title="GitHub"
                variation="github"
              />
            </ListItem>
            <ListItem>
              <SocialButton
                url="https://www.codepen.io/zslabs"
                title="CodePen"
                variation="codepen"
              />
            </ListItem>
            <ListItem>
              <SocialButton
                url="https://www.twitter.com/zslabs"
                title="Twitter"
                variation="twitter"
              />
            </ListItem>
          </Inline>
          <p
            css={{
              marginTop: theme.space.large,
              marginBottom: theme.space.large,
            }}
          >
            I create buttons, borders, and other groovy things at{' '}
            <ModalLink href="https://www.gremlin.com">Gremlin</ModalLink>. I
            work with techologies like{' '}
            <ModalLink href="https://reactjs.org">React</ModalLink>,{' '}
            <ModalLink href="https://gatsbyjs.org">Gatsby</ModalLink>,{' '}
            <ModalLink href="https://nextjs.org">Next.js</ModalLink>, and{' '}
            <ModalLink href="https://nodejs.org">Node</ModalLink>.{' '}
            <ModalLink href="https://www.framer.com/motion/">
              Framer Motion
            </ModalLink>{' '}
            and <ModalLink href="https://greensock.com/">GSAP</ModalLink> are my
            go-to animation utilities.
          </p>
          <p>
            My background involves pushing the limits of what we can build on
            the backend and how we can experience it on the frontend. My
            passions are perfecting process and educating those around me.
          </p>
          <SectionTitle>Speaking/Consulting</SectionTitle>
          <p>
            Have a project you'd like me to be part of?{' '}
            <ModalLink href="/contact/">Let's chat</ModalLink>.
          </p>
          <SectionTitle>How'd you build this site?!</SectionTitle>
          <p>
            Because I love open-source&mdash;it's available for anyone to use.
            Find a bug? Report it!{' '}
            <ModalLink href="https://github.com/zslabs/zslabs.com">
              View source
            </ModalLink>
            .
          </p>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default AboutModal
