import { graphql } from 'gatsby'

export const postTeaserFragment = graphql`
  fragment PostFragment on Mdx {
    fileAbsolutePath
    body
    excerpt(pruneLength: 120)
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
