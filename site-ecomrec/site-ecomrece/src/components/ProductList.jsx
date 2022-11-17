import ProductListItem from './ProductListItem';

function ProductList({ product,filterProd }) {
    return (
        <>
        <div className='d-flex justify-content-center'>
        <button onClick={()=>filterProd("men's clothing")} className="btn btn-outline-warning text-black">Men's Clothing</button>
        <button onClick={()=>filterProd("women's clothing")} className="btn btn-outline-warning text-black">Womens's Clothing</button>
        <button onClick={()=>filterProd("jewelery")} className="btn btn-outline-warning text-black">Jewelery</button>
        <button onClick={()=>filterProd("electronics")} className="btn btn-outline-warning text-black" > Electronic</button>
        </div>
        <div className='d-flex flex-wrap m-5 gap-1'>
            {
                product.map(product => <ProductListItem product={product} key={product.id} />)
            }
        </div>
        </>
    )
}

export default ProductList