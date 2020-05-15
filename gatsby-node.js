/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// Custom Webpack configuration
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  // Include ChaosKit in transpiled modules
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.js$|\.jsx$/,
          include: (modulePath) => /node_modules\/(chaoskit)/.test(modulePath),
          use: loaders.js(),
        },
      ],
    },
  })

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

const { kebabCase, toLower } = require('lodash')

//
// Lifecycle methods
//

function attachFieldsToNodes({ node, actions: { createNodeField } }) {
  if (node.internal.type !== 'Mdx') {
    return
  }

  const { slug, title } = node.frontmatter
  const articlePath = slug || kebabCase(toLower(title))
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
exports.onCreateNode = function (...args) {
  return Promise.all([attachFieldsToNodes].map((fn) => fn.apply(this, args)))
}

function getMarkdownQuery({ regex } = {}) {
  return `
    {
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: {
          fileAbsolutePath: { regex: "${regex}" }
          frontmatter: { title: { ne: "BLUEPRINT" } }
        }
      ) {
        edges {
          node {
            fileAbsolutePath
            body
            excerpt(pruneLength: 120)
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
    const articlePath = slug || kebabCase(toLower(title))

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
  const articleEdges = articleResults.data.allMdx.edges

  //
  // Articles
  //
  createSinglePages({
    createPage,
    edges: articleEdges,
    context: 'articles',
  })
}

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }

    type MdxFrontmatter {
      experience: [Shared__Blurb]
      projects: [Shared__Blurb]
    }

    type Shared__Blurb {
      blurb: String @mdx
    }
  `)
}
