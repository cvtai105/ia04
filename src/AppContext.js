import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();  // Tạo context mới
export const AppContextProvider = ({ children }) => {
    const [jwt, setJwt] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            login(token);
        }
        console.log('AppContextProvider: ', token)
    }
    , []);


    const login = (token) => {
        //decode token to get user data
        setJwt(token);
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const userData = JSON.parse(atob(base64));
        setUserData(userData);
        console.log('User Data: ', userData)
        setLoggedIn(true);
        console.log('Logged In: ', loggedIn)
        localStorage.setItem('accessToken', token);
    };
    const logout = () => {
        setUserData(null);
        setJwt(null);
        setLoggedIn(false);
        localStorage.removeItem('accessToken');
    };
    async function fetchWithAuth(url, options = {}) {
        console.log('Fetch with auth header:', url, options)
        const config = {
            ...options,
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
                ...(options.headers || {})
            }
        };

        console.log('Fetch with auth header:', config );
    
        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch with auth header failed:', error);
            throw error; // Re-throw error for caller to handle
        }
    }
    


    return (
        <AppContext.Provider value={{ jwt, userData, loggedIn, login, logout, fetchWithAuth }}>
            {children}
        </AppContext.Provider>
    );
};
