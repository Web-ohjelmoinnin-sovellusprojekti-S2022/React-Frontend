import axios from "axios"
import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import setAuthToken from "../components/setAuthToken";
export default function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [loggedin, setloggedin] = useState(false)
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
                setloggedin(setAuthToken(token))
                //console.log(loggedin)
                console.log(token)
            }).catch(error => {
                alert("Väärä käyttäjänimi ja/tai salasana.")
                console.log(error)
            })
    }

    useEffect(() => {
        console.log(loggedin)
        /*if (loggedin === true)
            return () => {
                    <p>Olet kirjautunut sisään</p>
            }
        else {
            return (
                <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
                    <div className="container-fluid py-5">
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
                                <Button block="true" size="lg" type="submit"  >
                                    Kirjaudu sisään
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            )
        }*/
    }, [loggedin])

    if (loggedin === true) {
        return (
            <p>Olet kirjautunut sisään</p>
        )
    }
    else {
        if(setAuthToken(localStorage.getItem("token")) === true) {
            setloggedin(true)
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

}