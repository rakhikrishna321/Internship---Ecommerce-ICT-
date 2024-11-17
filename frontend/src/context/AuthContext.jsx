import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    const login = async (username, password) => {
        // Perform login logic, retrieve token and set userId
        // Example:
        const response = await axios.post('/log', { username, password });
        setUserId(response.data.userId); // Assuming userId is returned
        return response.data; // Return whatever is necessary
    };

    const logout = () => {
        setUserId(null);
        localStorage.removeItem('token'); // Clear token on logout
    };

    return (
        <AuthContext.Provider value={{ login, logout, userId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
