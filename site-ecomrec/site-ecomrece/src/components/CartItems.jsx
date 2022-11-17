import React, { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";
import { useState } from "react";
import Form from 'react-bootstrap/Form'


function CartItemsP({ CartItems, add, munis, RemoveItem ,removeWillChecked}) {
  const [lgShow, setLgShow] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const Reft = useRef();
  const refNom = useRef();
  const refEmail = useRef();
  const refAdresse = useRef();
  const refPswd = useRef();
  const refEmailLogin = useRef();
  const refPswdLogin = useRef();
  const [AutoAdresse,setAutoAdresse] = useState("");
  const [ClientName,setClientName] = useState();
  const teleLiv = useRef();
  const villeLiv = useRef();
  const AddressLIv = useRef();
  const [idchecked,setidchecked] = useState([]);


  const getidcheck = (id,e) =>{

      if(e.target.checked==true){
        idchecked.push(id)
      }
  }


  // start handle invoice cmd
  const handlePdf = () => {
    var date = new Date()
    var date1 =
      date.toLocaleString('fr-fr', {
        timeZone: 'Africa/Casablanca',
      })

    var props = {
      outputType: OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: "Invoice 2021",
      orientationLandscape: false,
      compress: true,
      logo: {
        src: "logo.png",
        type: 'png',
        width: 53.33,
        height: 26.66,
        margin: {
          top: 0,
          left: 0
        }
      },
      stamp: {
        inAllPages: true,
        src: "logo.png",
        type: 'png',
        width: 20,
        height: 20,
        margin: {
          top: 0,
          left: 0
        }
      },
      business: {
        name: "Da Shop",
        address: "Ouarzazte hey Anoir rue 33",
        phone: "+212659540718",
      },
      contact: {
        label: "Invoice issued for:",
        name: `${ClientName}`,
        address: `${AutoAdresse}`,
        ville:`${villeLiv.current.value}`
      },
      invoice: {
        label: "Invoice #: ",
        num: 19,
        invGenDate: `Invoice Date: ${date1}`,
        headerBorder: false,
        tableBodyBorder: false,
        header: [
          {
            title: "#",
            style: {
              width: 10
            }
          },
          {
            title: "Title",
            style: {
              width: 30
            }
          },
          { title: "Price" },
          { title: "Quantity" },
          { title: "Total" }
        ],
        table: Array.from(CartItems.map((item, index) => ([
          index + 1,
          item.title,
          `${item.price}$`,
          item.quantity,
          `${item.quantity * item.price}$`
        ]))),
        additionalRows: [{
          col1: 'Total:',
          col2: `${CartItems.reduce(
            (total, it) => (total += it.price * it.quantity),
            0
          ).toFixed(2)}$`,
          style: {
            fontSize: 14
          }
        }
        ],
      },
      pageEnable: true,
      pageLabel: "Page ",
    };
    const pdfObject = jsPDFInvoiceTemplate(props);
    handleClose()
  }
  //end 

  //handle modal livraison

  const handleRegister = ()=>{
    let LoginData = JSON.parse(localStorage.getItem("client")) || []
    let id = LoginData.length

    // let serialized = JSON.stringify(dataobjt)
    // localStorage.setItem("client",serialized)

    if(!(refNom.current.value === "" || refEmail.current.value === "" || refAdresse.current.value === "" || refPswd.current.value === "")){
    LoginData.push(
      {
        id: id += 1,
        name:refNom.current.value,
        email:refEmail.current.value,
        address:refAdresse.current.value,
        pswd:refPswd.current.value
      }
    )    
    localStorage.setItem("client",JSON.stringify(LoginData))
    setAutoAdresse("")
    setAutoAdresse(refAdresse.current.value)
    setClientName(refNom.current.value)
    handleShow()
    setLgShow(false)
    }else{
      alert("enter data ...!")
    }
    }

    const handleLogin = () =>{
      let dataClient =JSON.parse(localStorage.getItem("client")) 
      dataClient.map((client,i)=>{
        if(client.email === refEmailLogin.current.value && client.pswd === refPswdLogin.current.value){
            handleShow()
            setLgShow(false)
            setAutoAdresse(client.address)
            setClientName(client.name)
        }
      })

    // if(email === refEmailLogin.current.value && pswd === refPswdLogin.current.value){
    //   let add = localStorage.getItem("address")
    //   handleShow()
    //   setLgShow(false)
    //   setAutoAdresse(add)
    // }
    }

  return (
    <div>
        <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Information de livraison</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="adresse"
                  autoFocus
                  value = {AutoAdresse && AutoAdresse}
                  ref={AddressLIv}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>ville</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ville"
                  autoFocus
                  ref={villeLiv}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Téléphone"
                  autoFocus
                  ref={teleLiv}
                />
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="primary" onClick={handlePdf}>
              Continue
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Table responsive="md">
        <thead ref={Reft}>
          <tr>
            <th>Image</th>
            <th>title</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
            <th></th>
            <th>Remove</th>
          </tr>
        </thead>
        {CartItems.map((i, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td><img src={i.image} alt={i.title} width={"60px"} height={"60px"} /></td>
                <td>{i.title}</td>
                <td><i onClick={() => munis(i)} className="bi bi-dash-square"></i>  {i.quantity} <i onClick={() => add(i)} className="bi bi-plus-square"></i></td>
                <td>{i.price}$</td>
                <td>{i.price * i.quantity}$</td>
                <td><i className="bi bi-cart-x text-danger" onClick={() => RemoveItem(i)}></i></td>
                <td><input type="checkbox" onChange={(e) => getidcheck(i.id,e)} /></td>
              </tr>
            </tbody>
          );
        })}
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td><Button variant="danger" onClick={()=>removeWillChecked(idchecked)}>remove</Button></td>
      </Table>
      <div className="cmd">
        <h3>Résumé De Votre Commande</h3>
        <div className="total">
          <p>Total</p>
          <p>
            {CartItems.reduce(
              (total, it) => (total += it.price * it.quantity),
              0
            ).toFixed(2)}$
          </p>
          
        </div>
        <Button variant="dark" onClick={() => setLgShow(true)}>Passer à la caisse</Button>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >

          <Modal.Body>
            <div className="ligIns" style={{ display: "flex", justifyContent: "space-between" }}>
              <Form style={{ width: "45%" }}>
              <h3>Connexion</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" ref={refEmailLogin} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="password" ref={refPswdLogin}/>
                </Form.Group>
                <Button variant="dark" style={{display:"flex" , justifyContent:"center"}} onClick={()=>handleLogin()}>CONNEXION</Button>
              </Form>
              <hr style={{background: "black",height: "40vh",width: "1px",marginTop:"50px"}}/>
              <Form style={{ width: "45%" }}>
              <h3>Nouveau Client DaShop</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control type="text" placeholder="Nom"  autoComplete="off" ref={refNom}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Email" ref={refEmail}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>address</Form.Label>
                  <Form.Control type="text" placeholder="Address" ref={refAdresse}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Mot De Passe:</Form.Label>
                  <Form.Control type="Password" placeholder="Password" ref={refPswd}/>
                </Form.Group>
                <Button variant="dark" onClick={()=>handleRegister()}>S'INSCRIRE</Button>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>


  );


}


export default CartItemsP;
