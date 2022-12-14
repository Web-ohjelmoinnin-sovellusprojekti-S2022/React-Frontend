import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


//Funktio tarkistaa, että löytyykö tokenia, jonka jälkeen kysyy käyttäjältä että haluaako poistaa käyttäjän.
//Poistaa myös käyttäjän tekemät näkymät.
const DeleteAccount = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const instance = axios.create({
    baseURL: 'http://localhost:8080/deleteuser'
  })
  if (localStorage.getItem("token") !== null) {
    instance.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token")
    if (window.confirm("Haluatko varmasti poistaa käyttäjän?")) {
      instance.post("http://localhost:8080/deleteuser").then(console.log).catch(console.log)
      axios.post("http://localhost:8080/customview/deletebyowner", {},
      {
        params: {
          token
        }
      }
    ).then(response => {
      alert("Käyttäjän poistaminen onnistui!")
      console.log(response)
    }).catch(error => {
      alert("Käyttäjän poistaminen epäonnistui")
      console.log(error)
    })
      localStorage.removeItem("token")
    }
  }
  else {
    alert("Et ole kirjautunut sisään.")
  }

  useEffect(() => {
    navigate('/')
  }, [])
  

}

export default DeleteAccount