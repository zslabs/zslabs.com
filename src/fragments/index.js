import { graphql } from 'gatsby'

export const postTeaserFragment = graphql`
  fragment PostFragment on MarkdownRemark {
    fileAbsolutePath
    html
    excerpt(pruneLength: 120)
    timeToRead
    frontmatter {
      title
      date(formatString: "MMMM D, YYYY")
      dateModified(formatString: "MMMM D, YYYY")
      slug
    }
    fields {
      slug
      fullUrl
    }
  }
`
