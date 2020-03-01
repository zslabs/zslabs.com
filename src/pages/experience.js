import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Row, RowColumn, Section, SectionTitle } from 'chaoskit/src/components'
import { useTheme } from 'emotion-theming'

import Foundation from '../layouts/Foundation'
import Data from '../components/Data'
import { BubbleList, BubbleListItem } from '../components/BubbleList'
import { titleStyles } from '../helpers'
import HelmetSEO from '../components/HelmetSEO'

const Experience = ({
  data: {
    file: {
      childMarkdownRemark: {
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
          as="h2"
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
        <Row css={{ justifyContent: 'center' }}>
          <RowColumn size={{ medium: 9 }}>
            <BubbleList>
              {experience.map((item, index) => (
                <BubbleListItem
                  key={item.company}
                  first={index === 0}
                  title={item.company}
                  meta={item.title}
                  badge={item.dates}
                >
                  <Data markdown>{item.blurb}</Data>
                </BubbleListItem>
              ))}
            </BubbleList>
          </RowColumn>
        </Row>
      </Section>
    </Foundation>
  )
}

Experience.propTypes = {
  data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query ExperiencePageData {
    file(name: { eq: "experience" }, absolutePath: { regex: "/src/data/" }) {
      childMarkdownRemark {
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

export default Experience
