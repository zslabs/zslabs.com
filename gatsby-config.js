const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Zach Schnackel',
    description: 'Portfolio site for software engineer, Zach Schnackel',
    siteUrl: 'https://www.zslabs.com',
    twitter: '@zslabs',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-mdx-frontmatter',
    },
    {
      resolve: 'gatsby-plugin-emotion',
      options: {
        sourceMap: false,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: path.join(__dirname, '/src/data'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'uploads',
        path: path.join(__dirname, '/static/uploads'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'articles',
        path: path.join(__dirname, '/src/articles'),
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-17637644-1',
      },
    },
    '@pauliescanlon/gatsby-mdx-embed',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-relative-source',
          },
          {
            resolve: 'gatsby-remark-smartypants',
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1000,
              linkImagesToOriginal: false,
              quality: 75,
              showCaptions: true,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) =>
              allMdx.edges.map((edge) =>
                Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: `${site.siteMetadata.siteUrl}/${edge.node.fields.fullUrl}`,
                  guid: `${site.siteMetadata.siteUrl}/${edge.node.fields.fullUrl}`,
                })
              ),
            query: `
              {
                allMdx(
                  limit: 50,
                  sort: { fields: [frontmatter___date], order: DESC }
                  filter: {
                    fileAbsolutePath: { regex: "/src/articles/" }
                    frontmatter: { title: { ne: "BLUEPRINT" } }
                  }
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 240)
                      frontmatter {
                        title
                        date
                      }
                      fields {
                        fullUrl
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'ZS Labs RSS Feed',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Zach Schnackel',
        short_name: 'Zach Schnackel',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#1d8cf5',
        display: 'minimal-ui',
        icon: './src/assets/media/me.png',
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }

          allSitePage {
            edges {
              node {
                path
              }
            }
          }
        }`,
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://www.zslabs.com',
      },
    },
    'gatsby-plugin-netlify', // Make sure to keep it last in the array
  ],
}
