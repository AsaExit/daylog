import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ userName, isLoggedIn, onLogout }) => (
    <nav className="navbar navbar-dark bg-dark">
        <div className="container">
            <Link className="navbar-brand" to="/">
                <div className="d-flex align-items-center">
                    <span className="h4 pl-2">Daily daylogs</span>
                </div>
            </Link>
            {isLoggedIn &&
                <h4 className="ml-auto mr-4">
                    <span className="badge variant badge-warning text-capitalize">
                        Welcome {userName} !
                </span>
                </h4>}
            {isLoggedIn &&
                <button type="button" onClick={onLogout} className="btn btn-outline-warning">
                    Logout 
                </button>}
        </div>
    </nav>
);

export default Header;
