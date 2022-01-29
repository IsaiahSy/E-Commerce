import React from "react";
import styles from '../styles/product.module.css';

const Product = ({ name, desc, img, price }) => {
    return (
        <div className={styles.product}>
            <img src={`https://${img}`} alt={name} name={name} height="150px" />
            <h2>{name}</h2>
            <h3>{desc}</h3>
            <h4>{price}</h4>
        </div>
    );
}

export default Product;