import React from "react";
import styles from '../styles/header.module.css';
import Nav from './Nav';

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.header__container}>
                <Nav />
            </div>
        </div>
    );
}

export default Header;