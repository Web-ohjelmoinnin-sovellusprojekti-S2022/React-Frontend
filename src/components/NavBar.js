import React from "react";
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg -navbarlight">
            <a className="navbar-brand" href="/">Gonacompany charts</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-link" to="/about">About</Link>
                    <Link className="nav-link" to="/login">Login</Link>
                    <div class="dropdown">
                        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown link
                        </a>

                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li><a class="dropdown-item" href="/temperature">Temperature charts</a></li>
                            <li><a class="dropdown-item" href="/emission">Emission charts</a></li>
                            <li><a class="dropdown-item" href="/customview">Make your own view</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}