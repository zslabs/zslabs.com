import { graphql } from 'gatsby';

export const postTeaserFragment = graphql`
  fragment PostFragment on MarkdownRemark {
    fileAbsolutePath
    html
    timeToRead
    frontmatter {
      title
      date
      dateModified
      slug
    }
    fields {
      slug
      fullUrl
    }
  }
`;
