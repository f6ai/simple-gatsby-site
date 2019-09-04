import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'

const ProductTemplate = ({ data: { contentfulProduct }, location }) => (
  <Layout>
    <div
      style={{
        margin: '0 auto',
        width: '100%',
        textAlign: 'center',
      }}
    >
      {/* Product Info */}
      <h2>
        {contentfulProduct.name} -
        <span style={{ color: '#ccc' }}>
          Added on {contentfulProduct.createdAt}
        </span>
      </h2>
      <h4>${contentfulProduct.price}</h4>
      <p>{contentfulProduct.description}</p>
      <button
        style={{
          background: '#f60',
          color: 'black',
          padding: '0.3em',
          border: '1px solid #f60',
          borderRadius: '10px',
          cursor: 'pointer',
          margin: '5px',
        }}
        className="snipcart-add-item"
        data-item-id={contentfulProduct.id}
        data-item-price={contentfulProduct.price}
        data-item-image={contentfulProduct.image.file.url}
        data-item-name={contentfulProduct.name}
        data-item-url={location.pathname}
      >
        Add to Cart
      </button>
      <Img
        style={{ margin: '0 auto', maxWidth: 600 }}
        fluid={contentfulProduct.image.fluid}
      />
    </div>
  </Layout>
)

export const query = graphql`
  query($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      name
      id
      slug
      price
      description
      createdAt(formatString: "MMMM Do, YYYY, h:mm:ss")
      image {
        fluid(maxWidth: 800) {
          ...GatsbyContentfulFluid
        }
        file {
          url
        }
      }
    }
  }
`

export default ProductTemplate
