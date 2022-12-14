import { Link } from 'react-router-dom';
const NotAuthNavBar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-md">
            <a href="/" className="navbar-brand">GonaCompany Kaaviot</a>
            <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item"><a href="/about" className="nav-link">Tietoa</a></li>
                    <li className="nav-item"><a href="/register" className="nav-link">Luo käyttäjä</a></li>
                    <li className="nav-item"><a href="/login" className="nav-link">Kirjaudu sisään</a></li>
                    <div className="dropdown">
                        <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            Kaaviot
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink" id='pasiviheraho'>
                            <li><a className="dropdown-item" href="/globaltemp">Lämpötilakaaviot</a></li>
                            <li><a className="dropdown-item" href="/emission">Päästökaaviot</a></li>
                        </ul>
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default NotAuthNavBar