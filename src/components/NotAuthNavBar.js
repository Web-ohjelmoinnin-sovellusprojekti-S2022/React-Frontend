import { Link } from 'react-router-dom';
const NotAuthNavBar = () => {
    /*return (
        <nav className="navbar navbar-expand-lg -navbarlight">
            <a className="navbar-brand" href="/">Gonacompany kaaviot</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav">
                    <Link className="nav-link" to="/about">Tietoa</Link>
                    <Link className="nav-link" to="/register">Luo käyttäjä</Link>
                    <Link className="nav-link" to="/login">Kirjaudu sisään</Link>
                    <div className="dropdown">
                        <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            Kaaviot
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink" id='pasiviheraho'>
                            <li><a className="dropdown-item" href="/globaltemp">Lämpötilakaaviot</a></li>
                            <li><a className="dropdown-item" href="/emission">Päästökaaviot</a></li>
                            <li><a className="dropdown-item" href="/customview">Luo oma näkymä</a></li>
                        </ul>
                    </div>
                </ul>
            </div>
        </nav>
    )*/
    return (
        <nav class="navbar navbar-dark bg-dark navbar-expand-md">
            <a href="/" class="navbar-brand">Gonacompany kaaviot</a>
            <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse" id="navbar">
                <ul class="navbar-nav">
                    <li class="nav-item"><a href="/about" class="nav-link">Tietoa</a></li>
                    <li class="nav-item"><a href="/register" class="nav-link">Luo käyttäjä</a></li>
                    <li class="nav-item"><a href="/login" class="nav-link">Kirjaudu sisään</a></li>
                    <div className="dropdown">
                        <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            Kaaviot
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink" id='pasiviheraho'>
                            <li><a className="dropdown-item" href="/globaltemp">Lämpötilakaaviot</a></li>
                            <li><a className="dropdown-item" href="/emission">Päästökaaviot</a></li>
                            <li><a className="dropdown-item" href="/customview">Luo oma näkymä</a></li>
                        </ul>
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default NotAuthNavBar