import axios from "axios"
import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../Register.css'

export default function Register(){
    
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        if(password != cpassword){
            alert("Salasanat eivät täsmää")
        }
        else if(password == ""){
            alert("Salasana ei saa olla tyhjä")
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
                navigate('/')
            }).catch(error => {
                alert("Käyttäjänimi on jo olemassa")
                console.log(error)
            })
    }

    const handlesignin = (e) => {
        e.preventDefault()
        navigate('/login')
        window.location(false);
    }

    return (
        <div class='chart'>
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
				<Button block="true" type="submit"  >
                                Luo käyttäjä
                </Button>
                </Form>
			</div>
                <div id="div">TAI</div>
               <Button id="Login" onClick={handlesignin}>Kirjaudu Sisään</Button>
            </div>

    )
}