import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ShoppingContext } from './Context/ShoppingContext';
import { useContext } from 'react';

function ProductListItem({product}) {   
  const {AddToCart} = useContext(ShoppingContext)
  return (
    <Card style={{ width: '18rem' }} >
      <Card.Img variant="top" src={product.image} className={"w-50 h-50"}/>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
            {product.description}
        </Card.Text>
        <Button variant="primary" onClick={()=>AddToCart(product)}>Add To Cart <i className="bi bi-bag-check"></i></Button>
      </Card.Body>
    </Card>
  );
}

export default ProductListItem;

