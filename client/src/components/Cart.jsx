import React, { useState, useEffect } from 'react';
import styles from '../styles/cart.module.css';

import { fetchCartProducts } from '../api';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [cartProduct, setCartProduct] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const storeProducts = async () => {
            if(!user) return navigate("/auth/signin");

            const { data } = await fetchCartProducts();

            setCartProduct(data);
        }

        storeProducts();
    }, []);

    const increaseQuantity = (e) => {
        e.preventDefault();
        alert("TODO");
    }

    const decreaseQuantity = (e) => {
        e.preventDefault();
        alert("TODO");
    }

    const deleteItem = (e) => {
        e.preventDefault();
    }

    return (
        <div className={styles.cart}>
            <div className={styles.cart__container}>
                <div className={styles.cart__list}>
                    <form>
                        <div className={styles.cart__top}>
                            <div className={styles.cart_topChkAll}>
                                <input type="checkbox" name="selectAll" />
                                <label>SELECT ALL</label>
                            </div>
                            <button onClick={deleteItem}>DELETE</button>
                        </div>

                        {cartProduct.map(product => <div className={styles.cart__product} key={product?._id}>
                                <div className={styles.cart__checkbox}>
                                    <input type="checkbox" name={`select_${product._id}`} />
                                </div>
                                <div className={styles.cart__nameAndBrand}>
                                    <h2>{product?.name}</h2>
                                    <h3>No brand, Color Familily:Black</h3>
                                </div>
                                <div className={styles.cart__price}>
                                    <h3>{product?.price}</h3>
                                </div>
                                <div className={styles.cart__quantity}>
                                    <button onClick={decreaseQuantity}>-</button>
                                        <h3>1</h3>
                                    <button onClick={increaseQuantity}>+</button>
                                </div>
                            </div>)}
                    </form>
                </div>
                <div className={styles.cart__summary}>
                    <div className={styles.cart__location}>
                        <h2>Location</h2>
                        <h3>Add address here...</h3>
                    </div>
                    <div className={styles.cart__orderSummary}>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;