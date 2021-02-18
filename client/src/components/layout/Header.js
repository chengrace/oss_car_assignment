//function based component
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header style={headerStyle}>
            <h1>Car Listings</h1>
            <Link style = {linkStyle} to="/">Home</Link> |
            <Link style = {linkStyle} to="/about"> About</Link>
        </header>
    )
}

const headerStyle = {
    background: '#3399ff',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}

export default Header;