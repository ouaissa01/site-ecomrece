import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";
import { useContext } from 'react';
import { ShoppingContext } from './Context/ShoppingContext';
import Swal from 'sweetalert2';

function NavBar() {
  const {CartItems} = useContext(ShoppingContext)
  const handleCart = ()=> {
    if(CartItems.length == 0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Désolé, il n'y a pas de produits dans le panier!`
      })
    }
  }
  return (
    <>
      <Navbar bg="dark" variant="dark" className='d-flex flex-rown' >
        <Container>
          <Navbar.Brand><img src='logo.png' width={"50px"} height={"50px"} style={{boxShadow:"0px 0px 10px black",borderRadius: "6px"}}/></Navbar.Brand>
          <Nav className="me-auto "  >
            <Link to={"/"} style={{textDecoration:"none" ,color:"#fff",fontWeight: "600",margin: "12px"}}>Home</Link>
            <Link style={{textDecoration:"none" ,color:"#fff",fontWeight: "600",margin: "12px"}}>Product</Link>
            <Link style={{textDecoration:"none" ,color:"#fff",fontWeight: "600",margin: "12px"}}>Contact</Link>
          </Nav>
           <Link to={CartItems.length == 0 ? "/" : "/Cart"} className="cart"><i className="bi bi-bag-check" onClick={handleCart} style={{color:"#f7cc3f"}}></i><span className='ncart'>{CartItems.length}</span></Link>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;

