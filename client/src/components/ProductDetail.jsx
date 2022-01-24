import React, { useState, useEffect } from "react";
import styles from '../styles/productdetail.module.css';

import { getProductDetail } from "../api";
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const [product, setProduct] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const getProduct = async () => {
            const { data } = await getProductDetail(id);
            setProduct(data);
        }

        getProduct();
    }, []);

    const handleBuyNow = () => {
        alert("TODO");
    }
    const handleAddToCart = () => {
        alert("TODO");
    }

    return (
        <div className={styles.pdetail}>
            <div className={styles.pdetail__container}>
                <div className={styles.pdetail__product}>
                    <div className={styles.pdetail__img}>
                        <img src={`https://${product?.media?.images[0].url}`} alt={product?.name} name={product?.name} />
                    </div>
                    <div className={styles.pdetail__info}>
                        <h2>{product?.name}</h2>
                        <h3>{product?.price?.current?.text}</h3>
                        <button onClick={handleBuyNow}>Buy Now</button>
                        <button onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;