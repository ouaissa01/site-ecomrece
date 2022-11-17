import React from 'react'


const handleRegister = ({refNom,refEmail,refAdresse,refPswd,setLgShow,setAutoAdresse,handleShow})=>{
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
    setAutoAdresse(refAdresse.current.value)
    handleShow()
    setLgShow(false)
    }else{
      alert("enter data ...!")
    }
    }


export default handleRegister