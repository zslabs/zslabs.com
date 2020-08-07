import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import me from '~media/me.png'
import useSiteMetadata from '~hooks/useSiteMetadata'

const HelmetSEO = ({ title, description, type, titleTemplate, ...rest }) => {
  // Grab out defaults
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
    twitter,
  } = useSiteMetadata()

  // If `titleTemplate` is used (react-helmet magic), we need to parse this ourselves to work within the other meta contexts that we display the title in
  const transformedTitle = titleTemplate
    ? titleTemplate.replace('%s', title || defaultTitle)
    : title || defaultTitle

  return (
    <Helmet
      title={title || defaultTitle}
      meta={[
        { name: 'description', content: description || defaultDescription },
        {
          property: 'og:type',
          content: type || 'website',
        },
        {
          property: 'og:locale',
          content: 'en_US',
        },
        {
          property: 'og:title',
          content: transformedTitle,
        },
        {
          property: 'og:description',
          content: description || defaultDescription,
        },
        {
          property: 'og:image',
          content: `${siteUrl}${me}`,
        },
        {
          name: 'twitter:image',
          content: `${siteUrl}${me}`,
        },
        {
          name: 'twitter:title',
          content: transformedTitle,
        },
        {
          name: 'twitter:description',
          content: description || defaultDescription,
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:site',
          content: twitter,
        },
        {
          name: 'twitter:creator',
          content: twitter,
        },
      ]}
      htmlAttributes={{
        lang: 'en',
      }}
      titleTemplate={titleTemplate}
      {...rest}
    />
  )
}

HelmetSEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  titleTemplate: PropTypes.string,
}

export default HelmetSEO
