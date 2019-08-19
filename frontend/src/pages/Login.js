import React, { useState } from 'react'
import logo from '../assets/logo.svg';
import './Login.css'

import api from '../services/api'

export default ({ history }) => {
    const [username, setUsername] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        const response = await api.post('/user', {
            user: username
        }).catch(err => console.log(err.response))

        console.log(response)
        history.push('/main')
    }

    return  (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt='Tindev logo'/>
                <input
                    placeholder="Indique o seu nome de utilizafor no Github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}