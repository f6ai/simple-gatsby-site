import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'

// pageQuery will look at the createPage() function's context and tries to find slug value
// then takes the slug and use it to get the individual post
export default ({ data: post }) => (
  <Layout>
    <div>
      <h1>{post.markdownRemark.frontmatter.title}</h1>
      <h4>
        Reading time: {post.markdownRemark.timeToRead}{' '}
        {post.markdownRemark.timeToRead > 1 ? 'minutes' : 'minute'}
      </h4>
      <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html }} />
    </div>
  </Layout>
)

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
      }
    }
  }
`
