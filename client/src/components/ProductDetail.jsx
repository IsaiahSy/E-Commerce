import React, { useState, useEffect } from "react";
import styles from '../styles/productdetail.module.css';

import { getProductDetail, addCartProduct } from "../api";
import { useParams } from 'react-router-dom';

const initialState = {name: "", price: "", itemId: ""};

const ProductDetail = () => {
    const [product, setProduct] = useState([]);
    const [productData, setProductData] = useState(initialState);
    const { id } = useParams();

    useEffect(() => {
        const getProduct = async () => {
            // const ac = new AbortController(); // Fix for suddenly unmounted component
            const { data } = await getProductDetail(id);
            
            setProduct(data);
            
            setProductData({name: data?.name, 
                            price: data?.price?.current?.text, 
                            id: data?.id});
        }
        getProduct();
        // return () => ac.abort(); // Abort both fetches on unmount
    }, []);

    const handleBuyNow = () => {
        alert("TODO");
    }
    const handleAddToCart = (e) => {
        e.preventDefault();

        addCartProduct(productData)
            .then(res => alert(res.data.message))
            .catch(err => console.log(err))
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