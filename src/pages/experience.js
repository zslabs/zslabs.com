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

import Foundation from '../layouts/Foundation';
import Data from '../components/Data';

const Experience = ({
  data: {
    file: {
      childDataYaml: { experience },
    },
  },
}) => (
  <Foundation>
    <Helmet title="Experience" />
    <Section>
      <SectionTitle as="h2" title="Experience" />
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

export default Experience;
