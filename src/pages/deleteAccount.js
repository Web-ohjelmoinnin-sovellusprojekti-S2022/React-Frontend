import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const DeleteAccount = () => {
  const navigate = useNavigate()
  const instance = axios.create({
    baseURL: 'http://localhost:8080/deleteuser'
  })
  if (localStorage.getItem("token") !== null) {
    instance.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token")
    if (window.confirm("Haluatko varmasti poistaa käyttäjän?")) {
      instance.post("http://localhost:8080/deleteuser").then(console.log).catch(console.log)
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