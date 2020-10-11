import { useTheme } from 'emotion-theming'
import { Section, SectionTitle } from 'chaoskit/src/components'
import { misc } from 'chaoskit/src/assets/styles/utility'
import { underline } from 'chaoskit/src/assets/styles/utility/text'

import ContactForm from '~components/ContactForm'
import Foundation from '~layouts/Foundation'
import HelmetSEO from '~components/HelmetSEO'
import { titleStyles } from '~helpers'
import { TextLink } from '~components/mdxShortcodes'

const ContactLink = (props) => {
  return (
    <TextLink
      css={[
        underline,
        {
          color: 'inherit',

          '&:hover, &:focus': {
            color: 'inherit',
          },
        },
      ]}
      {...props}
    />
  )
}

const Contact = () => {
  const theme = useTheme()

  return (
    <Foundation>
      <HelmetSEO title="Experience" />
      <Section>
        <SectionTitle
          as="h1"
          title="Contact"
          css={{
            '.CK__SectionTitle__Header': [
              titleStyles(theme),

              {
                '&::before': {
                  clipPath:
                    'polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)',
                  backgroundPosition: '-450px -375px',
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
          <p
            css={[
              misc.fluidSize({
                theme,
                property: 'fontSize',
                from: theme.fontSize.base,
                to: theme.fontSize.medium,
              }),
              {
                textAlign: 'center',
              },
            ]}
          >
            Have a project you'd like me to be part of? Let's chat!
          </p>
          <ContactForm />
          <p
            css={{
              textAlign: 'center',
              fontSize: theme.fontSize.small,
              color: theme.fontColor.muted,
            }}
          >
            Psst, this form was built with{' '}
            <ContactLink href="https://react-hook-form.com/">
              react-hook-form
            </ContactLink>
            .<br />
            Want to see how I built it?{' '}
            <ContactLink href="https://github.com/zslabs/zslabs.com/blob/master/src/components/ContactForm.js">
              Check out the source!
            </ContactLink>
          </p>
        </div>
      </Section>
    </Foundation>
  )
}

export default Contact
