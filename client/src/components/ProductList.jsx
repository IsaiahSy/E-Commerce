import React, { useState, useEffect } from "react";
import styles from '../styles/productlist.module.css';
import Product from './Product';

import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const getProductsData = useSelector(state => state.productReducer);
    
    useEffect(() => {
        setProducts(getProductsData.payload);
    }, [getProductsData]);

    return (
        <div className={styles.productlist}>
            <div className={styles.productlist__container}>
                {products && products?.map(product => <div key={product.id} className={styles.productlist__item}>
                    <Link to={`/product/${product.id}`}>
                        <Product name={product.name} img={product.imageUrl} price={product.price.current.text} />
                    </Link>
                </div>)}
            </div>
        </div>
    );
}

export default ProductList;