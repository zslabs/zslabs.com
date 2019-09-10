import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import {
  Badge,
  Button,
  List,
  ListItem,
  Row,
  RowColumn,
  Section,
  SectionTitle,
} from 'chaoskit/src/components';
import { rgba } from 'polished';
import { withTheme } from 'emotion-theming';

import Foundation from '../layouts/Foundation';
import Data from '../components/Data';
import { titleStyles } from '../helpers';
import pattern from '../assets/media/pattern.png';

const Experience = ({
  data: {
    file: {
      childDataYaml: { experience },
    },
  },
  theme,
}) => (
  <Foundation>
    <Helmet title="Experience" />
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
        <RowColumn size={{ small: 10, medium: 8 }}>
          <List className="bubbleList">
            {experience.map((item, index) => (
              <ListItem className="bubbleList-item" key={item.company}>
                <div className="bubbleList-item-bubble" />
                <div className="bubbleList-item-info">
                  <div className="bubbleList-item-title-wrapper">
                    <h4 className="bubbleList-item-title">{item.company}</h4>
                    <Badge
                      type={index === 0 ? 'primary' : null}
                      label={item.dates}
                      css={[
                        index === 0 && {
                          border: 0,
                          backgroundImage: `url(${pattern}) !important`,
                          backgroundColor: 'transparent',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'auto',
                          color: theme.contrast.base,
                          textShadow: `0 1px 10px ${rgba(
                            theme.color.dark.base,
                            0.1
                          )}`,
                          backgroundPosition: '60% 10%',
                        },
                      ]}
                    />
                  </div>
                  <div className="u-textMuted u-mb--regular">{item.title}</div>
                  <div className="u-mt--remove u-textMedium">
                    <Data markdown>{item.blurb}</Data>
                  </div>
                </div>
              </ListItem>
            ))}
          </List>

          <div className="u-textCenter u-mt--xlarge">
            <Button type="secondary" url="/#recent-projects">
              Recent Projects
            </Button>
          </div>
        </RowColumn>
      </Row>
    </Section>
  </Foundation>
);

Experience.propTypes = {
  data: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query ExperiencePageData {
    file(name: { eq: "experience" }) {
      childDataYaml {
        experience {
          company
          title
          dates
          blurb
        }
      }
    }
  }
`;

Experience.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme(Experience);
