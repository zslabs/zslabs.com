const path = require('path');

const { postCssPlugins } = require('./utils/postcss-config');
const { domainRegex } = require('./utils/helpers');

module.exports = {
  siteMetadata: {
    title: 'Zach Schnackel',
    description: 'Portfolio site for software engineer, Zach Schnackel',
    siteUrl: 'https://www.zslabs.com',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
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
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: '<!-- end -->',
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1000,
              linkImagesToOriginal: false,
              quality: 75,
              showCaptions: true,
            },
          },
          {
            resolve: 'gatsby-remark-relative-links',
            options: {
              domainRegex,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: ['noopener', 'noreferrer'],
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'uploads',
            },
          },
          'gatsby-plugin-twitter',
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              related: false,
            },
          },
          'gatsby-remark-responsive-iframe',
          'gatsby-remark-codepen',
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => allMarkdownRemark.edges.map(edge => Object.assign({}, edge.node.frontmatter, {
              description: edge.node.excerpt,
              url: `${site.siteMetadata.siteUrl}/articles/${
                edge.node.fields.slug
              }`,
              guid: `${site.siteMetadata.siteUrl}/articles/${
                edge.node.fields.slug
              }`,
              custom_elements: [{ 'content:encoded': edge.node.html }],
            })),
            query: `
              {
                allMarkdownRemark(
                  limit: 50,
                  sort: { fields: [frontmatter___date], order: DESC }
                  filter: {
                    fileAbsolutePath: { regex: "/src/articles/" }
                    frontmatter: { title: { ne: "BLUEPRINT" } }
                  }
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 120)
                      html
                      frontmatter {
                        title
                        date
                      }
                      fields {
                        slug
                        fullUrl
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
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
};
