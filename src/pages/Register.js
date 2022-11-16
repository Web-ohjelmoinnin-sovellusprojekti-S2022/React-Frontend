import axios from "axios"
import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default function Register(){
    
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");

    const handleSubmit = (e) => {
        if(password != cpassword){
            alert("Salasanat eivät täsmää")
        }
        e.preventDefault()
        axios.post("http://localhost:8080/register", {},
            {
                params: {
                    user,
                    password
                }
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
    }


    return (
        <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
            <div class="main-login-form">
                <Form onSubmit={handleSubmit}>
                <h3>Luo käyttäjä</h3>
					<div class="form-group">
						<label for="lg_username" class="sr-only">käyttäjätunnus </label>
						<input type="text" class="form-control" id="username" value={user} onChange={(e) => setUser(e.target.value)} name="username" placeholder="Käyttäjätunnus "/>
					</div>
					<div class="form-group">
						<label for="lg_password" class="sr-only">Salasana</label>
						<input type="password" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="password1" name="password1" placeholder="Salasana"/>
					</div>

                    <div class="form-group">
						<label for="lg_password" class="sr-only">Vahvista salasana</label>
						<input type="password" class="form-control" id="password2" name="password2" value={cpassword} onChange={(e) => setCPassword(e.target.value)} placeholder="Vahvista salasana"/>
					</div>
                <br></br>
				<Button block="true" size="lg" type="submit"  >
                                Luo käyttäjä
                </Button>
                </Form>
			</div>
            </div>
        </div>

    )
}