import React from "react";

const Product = ({ name, desc, img, price }) => {
    return (
        <>
            <h2>{name}</h2>
            <img src={`https://${img}`} alt={name} name={name} height="150px" />
            <h3>{desc}</h3>
            <h4>{price}</h4>
        </>
    );
}

export default Product;