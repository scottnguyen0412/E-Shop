import axios from 'axios';
import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import swal from 'sweetalert';
function Navbar() {

    const history = useHistory();
    const logoutSubmit = (e) => {
        e.preventDefault();
        axios.post(`/api/logout`).then(res => {
            if(res.data.status === 200)
            {
                // Khi user click logout thì sẽ remove token và name của user
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal('Success',res.data.message, 'success');
                history.push('/');
            }
        });
    }

    var AuthButton = '';
    // Nếu không có token trong local storage thì sẽ show ra Login và Register cho user
    if(!localStorage.getItem('auth_token'))
    {
        AuthButton = (
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </ul>
        );
    }
    // Mặt khác nếu token đã được lưu trong local storage thì chỉ hiện nút Logout
    else
    {
        AuthButton = (
            <li className="nav-item">
                    <button type='button' onClick={logoutSubmit} className="nav-link btn btn-warning btn-sm text-white" >Logout</button>
            </li>
        );
    }

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
                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/admin">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/collections">Collections</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/contact">Contact</Link>
                </li>
                {AuthButton} 
                </ul> 
            </div>
            </div>
    </nav>
  )
}

export default Navbar