import React from "react"
import { Link } from 'react-router-dom';



export default function Menu(){
    return (
        <div class="p-5 mb-4 bg-light rounded-3">
            <div class="container-fluid">
                    <Link className="nav-link" to="/temperature">Temperature charts</Link>
                    <Link className="nav-link" to="/emission">Emission charts</Link>
                    <Link className="nav-link" to="/customview">Create your own visualization view</Link>
            </div>
        </div>
    )
}