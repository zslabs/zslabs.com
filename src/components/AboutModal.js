import { Fragment } from 'react';
import useToggle from 'react-use/lib/useToggle';
import {
  Button,
  Modal,
  ModalBody,
  Close,
  Inline,
} from 'chaoskit/src/components';

import Icon from './Icon';
import me from '../assets/media/me.png';

const AboutModal = () => {
  const [isAboutModalOpen, toggleAboutModalOpen] = useToggle(false);

  return (
    <Fragment>
      <Button
        type="reset"
        className="header-about"
        onClick={toggleAboutModalOpen}
      >
        <img src={me} alt="About" />
      </Button>
      <Modal open={isAboutModalOpen} onOutsideModalClick={toggleAboutModalOpen}>
        <ModalBody>
          <Close
            onClick={() => toggleAboutModalOpen()}
            className="aboutModal-close"
          />
          <img src={me} className="aboutModal-image" alt="" />
          <h3 className="u-textCenter u-mb--small">Hi, I&apos;m Zach</h3>
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
            . My background involves pushing the limits of what we can build on
            the backend and how we can experience it on the frontend. My
            passions are perfecting process and educating those around me.
          </p>
          <h4 className="u-textFluid--xlarge">Speaking/Consulting</h4>
          <p>
            Have an event and/or consluting project you&apos;d like me to be a
            part of? Awesome!{' '}
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
            Because I love open-source—it&apos;s available for anyone to view.
            Find a bug? Report it!{' '}
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
              Copyright © {new Date().getFullYear()} Zach Schnackel. Penalty is
            </span>{' '}
            🔥
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default AboutModal;
