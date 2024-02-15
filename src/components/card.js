import React from "react";
import './cards.css';

function Card({item, handleClick}) {
    const {title, price, img} = item;
    return(
        <div className="cards">
            <div className="image_box">
                <img className="card_image" src={require(`../assets/${img}`)} alt="image" />
            </div>
            <div className="details">
                <p className="title">{title}</p>
                <p className="price">Price - {price}€</p>
                <button onClick={() => handleClick(item)} className="btn">Add to Cart</button>
            </div>
        </div>
    );
}

export default Card;