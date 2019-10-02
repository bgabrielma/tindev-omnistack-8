import React, { useEffect, useState } from 'react'
import './Main.css'
import { Link } from 'react-router-dom'

import logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';

import api from '../services/api'

export default ({ match }) => {

    const [users, setUsers] = useState([])
    async function loadUsers() {
        const response = await api.get('/user', {
            headers: {
                giver: match.params.id
            }
        }).catch(res => console.log(res.response))
        setUsers(response.data)

        console.log(response.data)
    }

    useEffect(() => {
        loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.id])

    async function handleDislike(id) {
        await api.post(`/dislikes/${id}`, {
            giver: match.params.id
        })

        loadUsers();
    }

    async function handleLike(id) {
        await api.post(`/likes/${id}`, {
            giver: match.params.id
        })

        loadUsers();
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} className="logo" alt="Tindev logo" />
            </Link>
            {users.length ? (
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <img src={user.avatar} alt="user" />
                        <footer>
                            <strong>{user.user}</strong>
                            <p>{user.bio || ' Bio not found'}</p>
                        </footer>
                        
                        <div className="buttons">
                            <button type="button" onClick={() => handleDislike(user.id)}>
                                <img src={dislike} alt="Dislike" />
                            </button> 
                            <button type="button" onClick={() => handleLike(user.id)}>
                                <img src={like} alt="Like" />
                            </button> 
                        </div>
                    </li>
                ))}
            </ul>
            ) : <div className="empty">Acabou :(</div> }
        </div>
    )
}