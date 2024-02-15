import './cart.css';
import React from "react";

function Cart({cart_item, size, counter, handleReset, handleSubmit}) {
    let total = 0;

    return(
        <div className="cart">
            <p className="shopping">Shopping Cart</p>
            <p className="diff_items">Different Items in Cart: <span>{size}</span></p>
            {cart_item.map((item) => {
                const itemTotal = counter[item.id] * item.price;
                total += itemTotal;

                return (
                    <div className="product_items" key={item.id}>
                        <p>Title: <span className="title">{item.title}</span></p>
                        <p>Amount: <span>{counter[item.id]}</span> Price: <span>{counter[item.id] * item.price}€</span>
                        </p>
                    </div>
                );
            })}
            <div>
                <p>Total: <span>{total}€</span></p>
                <button onClick={() => handleReset()} className="btn_reset">Reset</button>
                <span><button onClick={() => handleSubmit()} className="btn_submit">Submit</button></span>
            </div>
        </div>
    );
}

export default Cart;