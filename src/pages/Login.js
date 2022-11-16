import axios from "axios"
import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import setAuthToken from "../components/setAuthToken";
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
            }).catch(error => {
                alert("Väärä käyttäjänimi ja/tai salasana.")
                console.log(error)
            })
    }


        return (
            <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h3>Kirjaudu sisään</h3>
                    <br></br>
                    <div className="Login">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group size="lg" controlId="user">
                                <Form.Label>Käyttäjänimi</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="user"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="password">
                                <Form.Label>Salasana</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <br></br>
                            <Button block="true" size="lg" type="submit"  >
                                Kirjaudu sisään
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }