import React, { useState } from 'react'
import './navbarStyles.css'

const Navbar = ({ setPage }) => {
    const [username] = useState(JSON.parse(localStorage.getItem('adminData')).username)
    const handleLogout = () => {
        localStorage.removeItem('adminData');
        setPage('Login')

    }
    return (
        <nav>
            <ul>
                <li><button onClick={() => setPage('Home')}>Home</button></li>
                <li><button onClick={() => setPage('EmployeeList')}>Employee List</button></li>
                <li>{username}</li>
                <li><button className='logout' onClick={handleLogout}>Logout</button></li>
            </ul>
            <hr style={{ marginTop: '10px' }} />
        </nav>
    )
}

export default Navbar