import React from 'react';
import {Link} from 'react-router-dom';
function Navbar() {
  return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-info shadow sticky-top">
            <div className='container'>
            <Link className="navbar-brand" to="#">E-Shop</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to="#">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="#">Collection</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
                </ul>
            </div>
            </div>
    </nav>
  )
}

export default Navbar