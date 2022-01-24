import React from "react";
import styles from '../styles/header.module.css';
import Nav from './Nav';

const Header = () => {
    return (
        <div className={styles.header}>
            <Nav />
        </div>
    );
}

export default Header;