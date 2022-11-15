import axios from "axios"
import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default function Register(){
    
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");




    return (
        <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
            <div class="main-login-form">
                <h3>Luo käyttäjä</h3>
					<div class="form-group">
						<label for="lg_username" class="sr-only">käyttäjätunnus </label>
						<input type="text" class="form-control" id="username" name="username" placeholder="käyttäjätunnus "/>
					</div>
					<div class="form-group">
						<label for="lg_password" class="sr-only">Salasana</label>
						<input type="password" class="form-control" id="password1" name="password1" placeholder="salasana"/>
					</div>

                    <div class="form-group">
						<label for="lg_password" class="sr-only">Vahvista salasana</label>
						<input type="password" class="form-control" id="password2" name="password2" placeholder="vahvista salasana"/>
					</div>
                <br></br>
				<Button block="true" size="lg" type="submit"  >
                                Luo käyttäjä
                </Button>
			</div>
            </div>
        </div>

    )
}