import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

//CONTEXT 
const AuthContext = createContext();

//PROVIDER
const AuthProvider = ({ children }) => {
    //Global state
    const [state, setState] = useState({
        user: null,
        token: "",
    });


    // Initial local storage Data
    useEffect(() => {
        // temp function to check localStorage
        const loadLocalStorageData = async () => {
            let data = await AsyncStorage.getItem('@auth');
            let loginData = JSON.parse(data);
            setState({ ...state, user: loginData?.user, token: loginData?.token });
        };
        loadLocalStorageData();
    }, [])

    let token = state && state.token;

    //default axios setting 
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.baseURL = "https://react-native-crud-server-wi7i.onrender.com/api/v1";



    return (
        <AuthContext.Provider value={[state, setState]}>
            {children}
        </AuthContext.Provider>
    )
};

export { AuthContext, AuthProvider }
