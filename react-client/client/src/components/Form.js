import React, { useState, useEffect } from 'react';
import './Form.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const Form = (props) => {
    const [input, setInput] = useState({})

    const handleInputChange = (e) => setInput({
        ...input,
        [e.currentTarget.name]: e.currentTarget.value
    })

    const { isLogged, setIsLogged } = useState(false);
    const { message, setMessage } = useState("");

    const registerHandler = (e) => {
        e.preventDefault()
        axios.post('http://server.localhost/register', input)
            .then(response => {
                setMessage('zarejestrowano użytkownika')
                console.log(response)
            }).catch(error => {
                setMessage('błąd rejestracji')
                console.log(error)
            })
    }

    const loginHandler = (e) => {
        e.preventDefault()
        axios.post('http://server.localhost/login', { input })
            .then(response => {
                document.cookie = `Authorization=${response.data.token}`
                console.log(response)
                setMessage('zalogowano')
                setIsLogged(true)
            }).catch(error => {
                setMessage('błąd logowania')
                setIsLogged(false)
                console.log(error)
            })
    }

    return (
        <>
            <h3 className="title">{props.location.pathname === '/login' ? "Logowanie" : "Rejestracja"}</h3>
            <form onSubmit={props.location.pathname === '/login' ? loginHandler : registerHandler}>
                <input type="text" placeholder="login" name="name" onChange={handleInputChange} />
                <input type="password" placeholder="hasło" name="password" onChange={handleInputChange} />
                <div className="buttons">
                    <button type="submit">{props.location.pathname === '/login' ? 'zaloguj' : 'zarejestruj'}</button>
                </div>
            </form>
            <h3 style={{ color: "red", textAlign: "center", marginTop: '12px' }}>{message}</h3>
            {
                isLogged && <div style={{ color: 'red', textAlign: 'center' }}>Zalogowano</div>
            }
        </>
    )
}

export default withRouter(Form);