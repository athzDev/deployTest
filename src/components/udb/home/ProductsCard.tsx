import React, { useEffect, useState } from 'react'
import styled from "styled-components"

//image imports
import product1 from "../../../images/png/product-1.png"
import product2 from "../../../images/png/product-2.png"
import product3 from "../../../images/png/product-3.png"

type Props = {
    productId?: string;
    productImage?: string;
    productTitle?: string;
    productPrice?: string;
    productDesc?: string
}



const ProductsCard = (props: Props) => {
    const {productId, productTitle, productPrice, productDesc} = props
    
    const [imageName, setImageName] = useState("")

    useEffect(() => {
      switch(productId) {
          case "1" : 
          setImageName(product1)
          break;
          case "2" :
          setImageName(product2)
          break;
          case "3" :
          setImageName(product3)
          break;
          default:     
          setImageName(product1)
      }
  },[productId])

  return (
    <ProductWrapper>
        <img src={imageName} alt="product" />
        <h6>{productTitle}</h6>
        <h4>{productPrice}</h4>
        <p>{productDesc}</p>
    </ProductWrapper>
  )
}

export default ProductsCard

const ProductWrapper = styled.div`
    background: transparent linear-gradient(180deg, #fb00002c 0%, #e6e1e137 100%) 0% 0% no-repeat padding-box;    
    box-shadow: 0px 4px 6px #FB000054;
    border: 2px solid #F9F9F9;
    border-radius: 7px;
    padding: 10px;
    margin: 5px;

    & img {
        width: 200px;
        height: 120px;
        object-fit: contain;
    }
    & h6 {
        font-size: 15px;
        font-weight: 700;
        color: #3C3C3C;
        text-align: center;
        margin: 3px 0px;
    }
    & h4 {
        font-size: 20px;
        font-weight: bold;
        color: #FB2601;
        text-align: center;
        margin: 5px 0px;
    }
    & p {
        font-size: 11px;
        font-weight: 400;
        color: #3C3C3C;
        text-align: center;
        margin: 3px 0px;
    }
`