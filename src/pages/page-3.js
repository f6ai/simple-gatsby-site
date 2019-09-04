import React from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'

import Layout from '../components/layout'

const getImageData = graphql`
  {
    allFile {
      edges {
        node {
          relativePath
          size
          extension
          birthTime
        }
      }
    }
  }
`

export default () => (
  <Layout>
    <h1>Hello from page 3</h1>
    <h3>Image file data</h3>
    <StaticQuery
      query={getImageData}
      render={data => (
        <table>
          <thead>
            <tr>
              <th>Relative path</th>
              <th>Size of image</th>
              <th>Extension</th>
              <th>Birthtime</th>
            </tr>
          </thead>
          <tbody>
            {data.allFile.edges.map(({ node }, index) => (
              <tr key={index}>
                <td>{node.relativePath}</td>
                <td>{node.size}</td>
                <td>{node.extension}</td>
                <td>{node.birthTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    />
    <Link to="/page-2">Go to page 2</Link>
  </Layout>
)
