import React from "react"

export default function Signup() {
    
    return (
        <form>
        <h1 class="h3 mb-3 fw-normal">Create Account</h1>
    
        <div class="form-floating">
          <input data-testid="User" type="email" class="form-control" id="floatingInput" placeholder="Username"></input>
          <label for="floatingInput">Username</label>
        </div>
        <br></br>
    
        <div class="form-floating">
          <input data-testid="Pw" type="password" class="form-control" id="floatingPassword" placeholder="Password"></input>
          <label for="floatingPassword">Password</label>
        </div>
        <br></br>

        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="confPassword"></input>
          <label for="floatingPassword">Confirm password</label>
        </div>

        <br></br>
        
        <button class="w-100 btn btn-lg btn-primary" type="submit" value="login" data-testid="submit">Sign Up</button>
        
        </form>
    
    )
}