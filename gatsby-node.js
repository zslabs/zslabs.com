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
          include: modulePath => /node_modules\/(chaoskit)/.test(modulePath),
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
const crypto = require('crypto')

const _ = require('lodash')

function mdxField({ node, createNode, data, identifier }) {
  const fieldData = _.get(node.frontmatter, data)

  function createMdx(field) {
    const safeFieldName = _.snakeCase(field)

    const textNode = {
      id: `${node.id}___${safeFieldName}`,
      parent: node.id,
      dir: path.resolve('./'),
      internal: {
        type: `${node.internal.type}___${safeFieldName}`,
        mediaType: 'text/markdown',
        content: field,
        contentDigest: crypto
          .createHash('md5')
          .update(field)
          .digest('hex'),
      },
    }

    createNode(textNode)

    return textNode.id
  }

  // If an array, we know we're mapping through multiple values
  if (Array.isArray(fieldData)) {
    if (!identifier) {
      console.error('Identifier not found in data array') // eslint-disable-line no-console

      return null
    }

    return fieldData.map(fieldValue => createMdx(fieldValue[identifier]))
  }

  // Otherwise, it's a single value that we can run through our utility function
  return createMdx(data)
}

//
// Lifecycle methods
//

function attachFieldsToNodes({
  node,
  actions: { createNodeField, createNode },
}) {
  if (node.internal.type !== 'Mdx') {
    return
  }

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

  const frontmatterToMdx = [
    {
      data: 'experience',
      identifier: 'blurb',
    },
    {
      data: 'projects',
      identifier: 'blurb',
    },
    {
      data: 'testMdx',
    },
  ]

  frontmatterToMdx.forEach(({ data, identifier }) => {
    const field = _.get(node.frontmatter, data)

    if (field) {
      createNodeField({
        node,
        name: `${_.snakeCase(data)}___NODE`,
        value: mdxField({
          node,
          createNode,
          data,
          identifier,
        }),
      })
    }
  })
}

// eslint-disable-next-line func-names
exports.onCreateNode = function(...args) {
  return Promise.all([attachFieldsToNodes].map(fn => fn.apply(this, args)))
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
