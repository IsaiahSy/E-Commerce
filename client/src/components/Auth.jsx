import React, { useState, useEffect } from 'react';
import styles from '../styles/auth.module.css';

import { signin, signup } from '../api';
import { SIGN_IN } from "../constants"

import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const initialState = {firstName: "", lastName: "", email: "", password: "", confirmPassword: ""};

const Auth = () => {
    const [user, setUser] = useState(null);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [signinMessage, setSigninMessage] = useState("");
    const [invalidMessage, setInvalidMessage] = useState("");

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => { 
            if(user !== null) return navigate("/") 
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
        checkUser();

        if(location.pathname === "/auth/signup") 
            setIsSignup(true);
        else
            setIsSignup(false);

    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if(isSignup) {
                const { data } = await signup(formData);
                setSigninMessage(data?.message);
                navigate("/auth/signin");
            } else {
                const { data } = await signin(formData);
                dispatch({ type: SIGN_IN, payload: data });
                navigate("/");
                window.location.reload();
            }
        } catch (err) {
            setInvalidMessage(err.response.data);
        }
    }

    // store data in formData
    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    return (
        <div className={styles.auth}>
            <div className={styles.auth__container}>
                {isSignup ? <h2>Create your E-Shop Account</h2> : <h2>Hello Welcome to E-Shop! Please Login</h2>}
                <form onSubmit={handleSubmit}>
                    {isSignup ? <>
                                    <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required /><br />
                                    <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required /><br />
                                </>
                    : null}

                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
                    {isSignup ? <>
                                    <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required /><br />
                                </>
                    : null}

                    <button type="submit">{isSignup ? 'Sign Up' : 'Sign In'}</button>
                </form>
                {<h2>{signinMessage}</h2>}
                {<h2>{invalidMessage?.message}</h2>}
            </div>
        </div>
    );
}

export default Auth;