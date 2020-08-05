import { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Modal,
  ModalBody,
  Close,
  Inline,
  ListItem,
} from 'chaoskit/src/components'
import { text, link } from 'chaoskit/src/assets/styles/utility'
import { useTheme } from 'emotion-theming'

import Icon from './Icon'
import { TextLink } from './mdxShortcodes'

import me from '~media/me-small.png'
import { buttonBase } from '~helpers'

const SocialButton = ({ url, title, icon }) => {
  const theme = useTheme()

  return (
    <Button
      url={url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      iconOnly
      title={title}
      css={[
        buttonBase(theme, { type: icon }),
        {
          '&:hover, &:focus': {
            transform: 'scale(1.15)',
          },
        },
      ]}
    >
      <Icon icon={icon} />
    </Button>
  )
}

SocialButton.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

const AboutModal = () => {
  const [isAboutModalOpen, toggleAboutModalOpen] = useState(false)
  const theme = useTheme()

  return (
    <Fragment>
      <Button
        className="ZS__Header__Item"
        type="reset"
        onClick={() => toggleAboutModalOpen(true)}
      >
        <img
          loading="lazy"
          src={me}
          alt="About"
          css={{
            width: theme.height.base,
            height: theme.height.base,
            borderRadius: '50%',
            boxShadow: theme.boxShadow.neutral,
          }}
        />
      </Button>
      <Modal
        open={isAboutModalOpen}
        onOutsideModalClick={() => toggleAboutModalOpen(false)}
      >
        <ModalBody>
          <Close
            onClick={() => toggleAboutModalOpen(false)}
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
              borderRadius: '50%',
              boxShadow: theme.boxShadow.neutral,
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
                icon="github"
              />
            </ListItem>
            <ListItem>
              <SocialButton
                url="https://www.codepen.io/zslabs"
                title="CodePen"
                icon="codepen"
              />
            </ListItem>
            <ListItem>
              <SocialButton
                url="https://www.twitter.com/zslabs"
                title="Twitter"
                icon="twitter"
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
            <TextLink
              href="https://www.gremlin.com"
              css={[text.underline, link.reset(theme)]}
            >
              Gremlin
            </TextLink>
            . I work with techologies like{' '}
            <TextLink
              href="https://reactjs.org"
              css={[text.underline, link.reset(theme)]}
            >
              ReactJS
            </TextLink>
            ,{' '}
            <TextLink
              href="https://gatsbyjs.org"
              css={[text.underline, link.reset(theme)]}
            >
              GatsbyJS
            </TextLink>
            ,{' '}
            <TextLink
              href="https://nextjs.org"
              css={[text.underline, link.reset(theme)]}
            >
              Next.JS
            </TextLink>
            , and{' '}
            <TextLink
              href="https://nodejs.org"
              css={[text.underline, link.reset(theme)]}
            >
              NodeJS
            </TextLink>
            . My background involves pushing the limits of what we can build on
            the backend and how we can experience it on the frontend. My
            passions are perfecting process and educating those around me.
          </p>
          <h4 css={{ ...theme.fontSize.xlarge__fluid }}>Speaking/Consulting</h4>
          <p>
            Have an event or consulting project you&apos;d like me to be a part
            of? Awesome!{' '}
            <a
              href="mailto:info@zslabs.com"
              css={[text.underline, link.reset(theme)]}
            >
              Let&apos;s chat
            </a>
            .
          </p>
          <h4 css={{ ...theme.fontSize.xlarge__fluid }}>
            How&apos;d you build this site?!
          </h4>
          <p>
            Because I love open-source&mdash;it&apos;s available for anyone to
            use. Find a bug? Report it!{' '}
            <TextLink
              href="https://github.com/zslabs/zslabs.com"
              css={[text.underline, link.reset(theme)]}
            >
              View source
            </TextLink>
            .
          </p>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default AboutModal
