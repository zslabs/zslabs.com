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

const _ = require('lodash')
const remark = require('remark')
const remarkHtml = require('remark-html')
const remarkRelativeLinks = require('remark-relative-links')
const remarkExternalLinks = require('remark-external-links')

const { domainRegex } = require('./utils/helpers')

function remarkField({ dataSet, field = '' }) {
  // If we don't find anything, get outta here!
  if (!dataSet) return null

  // Utility function to hold the 🔥
  const remarkify = data =>
    remark()
      .use(remarkHtml)
      .use(remarkRelativeLinks, {
        domainRegex,
      })
      .use(remarkExternalLinks, {
        target: '_blank',
        rel: ['noopener', 'noreferrer'],
      })
      .processSync(data)
      .toString()

  // If an array, we know we're mapping through multiple values
  if (Array.isArray(dataSet)) {
    return dataSet.map(data => remarkify(data[field]))
  }

  // Otherwise, it's a single value that we can run through our utility function
  return remarkify(dataSet)
}

//
// Lifecycle methods
//

function attachFieldsToNodes({ node, actions }) {
  const { createNodeField } = actions

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
