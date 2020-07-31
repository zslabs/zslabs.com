import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Section, SectionTitle } from 'chaoskit/src/components'
import { useTheme } from 'emotion-theming'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { titleStyles } from '~helpers'
import Foundation from '~layouts/Foundation'
import { BubbleList, BubbleListItem } from '~components/BubbleList'
import HelmetSEO from '~components/HelmetSEO'

const Experience = ({
  data: {
    file: {
      childMdx: {
        frontmatter: { experience },
      },
    },
  },
}) => {
  const theme = useTheme()

  return (
    <Foundation>
      <HelmetSEO title="Experience" />
      <Section>
        <SectionTitle
          as="h1"
          title="Experience"
          css={{
            '.CK__SectionTitle__Header': [
              titleStyles(theme),

              {
                '&::before': {
                  clipPath:
                    'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                  backgroundPosition: '-600px -175px',
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
            {experience.map((item, index) => (
              <BubbleListItem
                key={item.company}
                first={index === 0}
                title={item.company}
                meta={item.title}
                badge={item.dates}
              >
                <MDXRenderer>{item.blurb}</MDXRenderer>
              </BubbleListItem>
            ))}
          </BubbleList>
        </div>
      </Section>
    </Foundation>
  )
}

Experience.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Experience

export const pageQuery = graphql`
  query ExperiencePageData {
    file(name: { eq: "experience" }, absolutePath: { regex: "/src/data/" }) {
      childMdx {
        frontmatter {
          experience {
            company
            title
            dates
            blurb
          }
        }
      }
    }
  }
`
