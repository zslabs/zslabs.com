/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// Custom Webpack configuration
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (['develop'].includes(stage)) {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /\.js$|\.jsx$/,
            exclude: /(node_modules|cache|public)/,
            use: [
              {
                loader: 'eslint-loader',
              },
            ],
          },
        ],
      },
    })
  }
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: require.resolve('@wzuo/babel-plugin-polished'),
  })
}

const path = require('path')

const _ = require('lodash')

//
// Lifecycle methods
//

function attachFieldsToNodes({ node, actions }) {
  if (node.internal.type !== 'MarkdownRemark') {
    return
  }

  const { createNodeField } = actions

  const { slug, title } = node.frontmatter
  const articlePath = slug || _.kebabCase(_.toLower(title))
  const fullUrl = `/articles/${articlePath}/`

  // Slug overrides
  createNodeField({
    node,
    name: 'slug',
    value:
      node.frontmatter.slug && node.frontmatter.slug.trim() !== ''
        ? node.frontmatter.slug
        : articlePath,
  })

  // Full URL
  createNodeField({
    node,
    name: 'fullUrl',
    value: fullUrl,
  })
}

// eslint-disable-next-line func-names
exports.onCreateNode = function(...args) {
  return Promise.all([attachFieldsToNodes].map(fn => fn.apply(this, args)))
}

function getMarkdownQuery({ regex } = {}) {
  return `
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: {
          fileAbsolutePath: { regex: "${regex}" }
          frontmatter: { title: { ne: "BLUEPRINT" } }
        }
      ) {
        totalCount
        edges {
          node {
            fileAbsolutePath
            html
            excerpt(pruneLength: 120)
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
        }
      }
    }
  `
}

function createSinglePages({
  createPage,
  edges,
  context,
  filename = 'Single',
}) {
  const component = path.resolve(`src/templates/${context}/${filename}.js`)

  edges.forEach(({ node }) => {
    const { slug, title } = node.frontmatter
    const articlePath = slug || _.kebabCase(_.toLower(title))

    createPage({
      path: `/articles/${articlePath}`,
      component,
      context: {
        slug: articlePath,
        fileAbsolutePath: node.fileAbsolutePath,
      },
    })
  })
}

exports.createPages = async ({ actions, graphql }) => {
  const results = await Promise.all([
    graphql(getMarkdownQuery({ regex: '/src/articles/' })),
  ])

  const [articleResults] = results
  const { createPage } = actions
  const articleEdges = articleResults.data.allMarkdownRemark.edges

  //
  // Articles
  //
  createSinglePages({
    createPage,
    edges: articleEdges,
    context: 'articles',
  })
}
