import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Row, RowColumn, Section, SectionTitle } from 'chaoskit/src/components'
import { useTheme } from 'emotion-theming'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Foundation from '../layouts/Foundation'
import { BubbleList, BubbleListItem } from '../components/BubbleList'
import { titleStyles } from '../helpers'
import HelmetSEO from '../components/HelmetSEO'

const Experience = ({
  data: {
    file: {
      childMdx: {
        frontmatter: { testMdx, experience },
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
            <MDXRenderer>{testMdx}</MDXRenderer>
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
      childMdx {
        frontmatter {
          testMdx
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
