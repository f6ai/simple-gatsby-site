const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const PostTemplate = path.resolve('./src/templates/post-template.js')
const BlogTemplate = path.resolve('./src/templates/blog-template.js')
const ProductTemplate = path.resolve('./src/templates/product-template.js')

// gets called whenever a new node created or an old one updated
// add slugs to the posts that we get from the allMarkdownRemark query's nodes
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  // there're several node types, have to check the type first
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'posts' })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

// create pages based on the individual slugs
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }

      allContentfulProduct {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  const posts = result.data.allMarkdownRemark.edges

  posts.forEach(({ node: post }) => {
    createPage({
      path: `posts${post.fields.slug}`,
      component: PostTemplate,
      context: {
        slug: post.fields.slug,
      },
    })
  })

  const postsPerPage = 2
  const totalPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: totalPages }).forEach((_, index) => {
    const currentPage = index + 1
    const isFirstPage = index === 0
    const isLastPage = currentPage === totalPages
    // posts.forEach((_, index, postsArray) => {
    //   const postsPerPage = 1
    //   const totalPages = postsArray.length
    // const currentPage = index + 1
    // const isFirstPage = index === 0
    // const isLastPage = currentPage === totalPages

    createPage({
      path: isFirstPage ? '/blog' : `/blog/${currentPage}`,
      component: BlogTemplate,
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        isFirstPage,
        isLastPage,
        currentPage,
        totalPages,
      },
    })
  })

  const products = result.data.allContentfulProduct.edges
  products.forEach(({ node: product }) => {
    createPage({
      path: `/products/${product.slug}`,
      component: ProductTemplate,
      context: {
        slug: product.slug,
      },
    })
  })
}
