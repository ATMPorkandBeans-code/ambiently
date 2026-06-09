import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/check_session`, {
            credentials: 'include'
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return null
            })
            .then(data => {
                if (data) setUser(data)
            })
    }, [])

    function signup(username, password) {
        return fetch(`${import.meta.env.VITE_API_URL}/signup`, {
            method: 'POST',
            headers: { "Content-Type": 'application/json'},
            credentials: 'include',
            body: JSON.stringify({ username, password })
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            throw new Error('Signup failed')
        })
        .then(data => setUser(data))
    }

    function login(username, password) {
        return fetch(`${import.meta.env.VITE_API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({ username, password })
        })
        .then (res => {
            if (res.ok) {
                return res.json()
            }
            throw new Error('Login failed')
        })
        .then (data => setUser(data))
    }

    function logout() {
        return fetch(`${import.meta.env.VITE_API_URL}/logout`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(res => {
            if (res.ok) {
                setUser(null)
            }
        })
    }

    return (
        <UserContext.Provider value={{ user, setUser, login, signup, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext)
}