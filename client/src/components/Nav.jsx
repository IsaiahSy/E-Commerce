import React, { useState, useEffect } from "react";
import styles from '../styles/nav.module.css';

import { navRoutes } from '../routes';
import { Link } from 'react-router-dom';
import { LOGOUT } from "../constants";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Nav = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkUser = () => { 
            if(user !== null) return navigate("/");                                                                 
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
        checkUser();
    }, []);

    const handleLogout = () => {
        dispatch({ type: LOGOUT, payload: null });
        navigate("/");
        window.location.reload();
    }

    return (
        <div className={styles.nav}>
            <div className={styles.nav__container}>
                <ul>
                    {navRoutes.map((nav, index) => {
                        if(user && (nav.name !== "SIGN IN" && nav.name !== "SIGN UP")) {
                            return <Link to={nav.to} key={index}><li><h2>{nav.name}</h2></li></Link>              
                        } 
                        else if(!user) {
                            return <Link to={nav.to} key={index}><li><h2>{nav.name}</h2></li></Link>
                        }
                    })}
                    {user ? <li><Link to="/" onClick={handleLogout}><h2>LOGOUT</h2></Link></li> : null}
                    
                </ul>
                {user ? <><h2>{user?.firstName} {user?.lastName}</h2></> : null}
            </div>
        </div>
    );
};

export default Nav;