import axios from "axios";
import React from "react";
import { useState } from "react";



const DeleteAccount = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:8080/deleteuser'
      });
    instance.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem("token")
    instance.post("http://localhost:8080/deleteuser").then(console.log).catch(console.log)
    localStorage.removeItem("token")
}

export default DeleteAccount