import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch('/check_session')
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
        return fetch('/signup', {
            method: 'POST',
            headers: { "Content-Type": 'application/json'},
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
        return fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
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
        return fetch('/logout', {
            method: 'DELETE'
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