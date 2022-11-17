import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CartItemsP from "./components/CartItems";
import NavBar from "./components/NavBar";
import { ShoppingContext } from "./components/Context/ShoppingContext";
import NotFound from "./components/PageNotFound/NotFound";


function App() {
  const [Data,setData] = useState([])
  const [Dataprod, setDataProd] = useState(Data);

  const filterProd = (cat)=>{
    const updatedList = Data.filter((x)=>x.category === cat)
    setDataProd(updatedList)
  }

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((product) => {
      setData(product.data);
    });

  });
  const [CartItems, setCartItems] = useState([]);
  const AddToCart = (prod) => {
    let ProCart = CartItems.find((product) => product.id === prod.id);
    if (ProCart) {
      ProCart.quantity += 1;
      setCartItems([...CartItems]);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Your product has been updated",
        showConfirmButton: false,
        time: 1500,
      });
    } else {
      prod.quantity = 1;
      setCartItems([prod, ...CartItems]);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Your product has been Saved",
        showConfirmButton: false,
        time: 1500,
      });
    }

  };
  const Add = (it) => {
    let findProd = CartItems.find((product) => product.id === it.id);
    if (findProd) {
      findProd.quantity += 1;
      setCartItems([...CartItems]);
    }
  };
  const Munis = (it) => {
    let findProd = CartItems.find((product) => product.id === it.id);
    if (findProd) {
      findProd.quantity -= 1;
      if (findProd.quantity === 0) {
        setCartItems(CartItems.filter((i) => i.id !== it.id));
      } else {
        setCartItems([...CartItems]);
      }
    }
  };
  const RemoveItem = (it) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
            setCartItems(CartItems.filter(product=>product.id !== it.id))
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  };
  const removeWillChecked = (id)=>{
      setCartItems(CartItems.filter(prod=>!(id.includes(prod.id))))      
  }
  return (
    
    <ShoppingContext.Provider value={
      {
        Dataprod,
        AddToCart,
        CartItems,
        Add,
        Munis,
        RemoveItem
      }
    }>
      <div className="App">
        <NavBar/>
        <Routes>
          <Route
            path="/"
            element={<Home product={Dataprod} AddToCart={AddToCart} filterProd={filterProd}/>}
          />
          <Route
            path="/Cart"
            element={<CartItemsP removeWillChecked={removeWillChecked} CartItems={CartItems} add={Add} munis={Munis} RemoveItem={RemoveItem} />}
          />
          <Route
            path="/*"
            element={<NotFound  />}
          />
        </Routes>
      </div>
    </ShoppingContext.Provider>
  );
}

export default App;
