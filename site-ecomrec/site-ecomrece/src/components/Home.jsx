import React, { useContext } from 'react'
import ProductList from './ProductList'
import Slide from './Slide'

function Home({product,filterProd}) {
    return (
        <>
        <Slide/>
            <ProductList product={product} filterProd={filterProd}/></>
    )
}

export default Home