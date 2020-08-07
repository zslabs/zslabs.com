import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query GlobalSiteMetadata {
        site {
          siteMetadata {
            title
            siteUrl
            description
            twitter
          }
        }
      }
    `
  )

  return siteMetadata
}

export default useSiteMetadata
