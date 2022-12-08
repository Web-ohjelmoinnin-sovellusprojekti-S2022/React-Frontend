import axios from "axios"
import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { Form, Button, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import setAuthToken from "../components/setAuthToken";
import '../Login.css';



export default function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8080/login", {},
            {
                params: {
                    user,
                    password
                }
            }).then(response => {
                const token = response.data
                localStorage.setItem("token", token)
                setAuthToken(token)
                console.log(token)
                navigate('/')
                window.location.reload(false);
            }).catch(error => {
                alert("Väärä käyttäjänimi ja/tai salasana.")
                console.log(error)
            })
    }
    const handlesignup = (e) => {
        e.preventDefault()
        navigate('/register')
        window.location.reload(false);
    }
    return (
        <div class="loginContent">
            <div class="loginTitle">Kirjaudu Sisään</div>
            <Form onSubmit={handleSubmit} class="loginForm">
                <Form.Group controlId="user">
                    <Form.Control
                        autoFocus
                        id="Loginid"
                        placeholder="käyttäjätunnus"
                        type="user"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Control
                        id="loginPassword"
                        placeholder="salasana"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <br></br>
                <Button block="true" type="submit" id="loginin">
                    Kirjaudu sisään
                </Button>
            </Form>
            <div class="myDiv">TAI</div>
            <Button id="Register" onClick={handlesignup} >
                Luo Käyttäjä
            </Button>
        </div>
        
    )
}