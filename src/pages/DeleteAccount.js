import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";



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
      console.log(response)
    }).catch(error => {
      alert("Näkymien poisto epäonnistui")
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