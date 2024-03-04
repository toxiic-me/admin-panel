import React, { useState } from 'react'
import './loginStyles.css'

const Login = ({ setPage }) => {
    const [formData, setFormData] = useState({});
    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));


    const handleLogin = async (e) => {
        console.log(formData);
        e.preventDefault()
        try {
            let response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            let result = await response.json();
            if (result?.error) {
                alert(result.error)
            } else {
                const { token } = result;
                localStorage.setItem('adminData', JSON.stringify({ token, username: formData.username }))
                setTimeout(() => {
                    setPage('Home')
                }, 200);

            }

        } catch (error) {
            alert('Unexcepted error occurred')
        }
    }

    return (
        <div className='main'>
            <form onSubmit={handleLogin}>
                <h1>!! Welcome Back !!</h1>
                <div className='input'>
                    <label htmlFor="username">Username: </label>
                    <input type="text" id='username' name='username' onChange={handleChange} />
                </div>
                <div className='input'>
                    <label htmlFor="password">Password: </label>
                    <input type="text" id='password' name='password' onChange={handleChange} />
                </div>
                <input type="submit" value='Login' className='loginBtn' />
            </form>
        </div>
    )
}

export default Login