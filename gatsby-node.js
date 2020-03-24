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

function createMdx({ node, createTextNode, createNodeField, data, fieldName }) {
  // Convert field into "safe" version for querying
  const safeFieldName = fieldName.replace('.', '_')

  const textNode = createTextNode({
    id: `${node.id}__${safeFieldName}`,
    parent: node.id,
    dir: path.resolve('./'),
    internal: {
      type: `${node.internal.type}__${safeFieldName}`,
      mediaType: 'text/markdown',
      content: data,
      contentDigest: crypto
        .createHash(`md5`)
        .update(data)
        .digest(`hex`),
    },
  })

  // Create markdownBody___NODE field
  createNodeField({
    node,
    name: `${safeFieldName}__NODE`,
    value: textNode.id,
  })
}

function mdxField({ node, createTextNode, createNodeField, fieldName }) {
  const data = _.get(node.frontmatter, fieldName)

  // If we don't find anything, get outta here!
  if (!data) return null

  // If an array, we know we're mapping through multiple values
  if (Array.isArray(data)) {
    return data.map(fieldValue =>
      createMdx({
        node,
        createTextNode,
        createNodeField,
        data: fieldValue,
        fieldName,
      })
    )
  }

  // Otherwise, it's a single value that we can run through our utility function
  return createMdx({ node, createTextNode, createNodeField, data, fieldName })
}

//
// Lifecycle methods
//

function attachFieldsToNodes({ node, actions }) {
  const { createNodeField, createNode } = actions

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

  const frontmatterToMdx = ['experience', 'projects', 'testMdx']
  // NEED TO TAKE CARE OF ARRAYS
  frontmatterToMdx.forEach(value => {
    mdxField({
      node,
      createTextNode,
      createNodeField,
      fieldName: value,
    })
  })

  // Experience Blurb
  if (node.frontmatter.experience) {
    createNodeField({
      name: 'experienceBlurb',
      node,
      value: remarkField({
        dataSet: node.frontmatter.experience,
        field: 'blurb',
      }),
    })
  }

  // Project description
  if (node.frontmatter.projects) {
    createNodeField({
      name: 'projectBlurb',
      node,
      value: remarkField({
        dataSet: node.frontmatter.projects,
        field: 'blurb',
      }),
    })
  }

  if (node.frontmatter.testMdx) {
    const textNode = createNode(textNode)
  }
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
