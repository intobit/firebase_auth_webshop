import React, {useEffect, useState} from 'react';
import { db } from "../firebase/firebase";
import { ref, onValue} from "firebase/database";
import Navbar from "../components/navbar";
import { useAuth } from "../firebase/AuthProvider";
import './previousorders.css'

function PreviousOrders() {
    const { currentUser } = useAuth();
    const [customerOrders, setCustomerOrders] = useState([]);

    useEffect(() => {
        if (currentUser) {
            const customerId = currentUser.uid;

            const userOrdersRef = ref(db, `customers/${customerId}/customer_orders`);

            onValue(userOrdersRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const orders = Object.values(data);
                    setCustomerOrders(orders);
                }
            });
        }
    }, [currentUser]);
    return(
        <>
            <Navbar />
            <div>
                {customerOrders.map((order) => (
                    <div key={order} className="order_cards">
                        <div className="inline_cards" id="order">
                            <p><span>Order Date: </span>{order.order_date}</p>
                            <p key={order}><span>Ordered By: </span>{order.customer_name}
                                            <span>  Email: </span>{order.customer_email}
                            </p>
                        </div>

                        <div>
                            {order.customer_orders.map((item, index) =>(
                                <div key={item.id}>
                                    <div className="inline_cards" id="items">
                                        <p><span>Titel: </span>{item.title}
                                            <span>      Amount: </span>{item.amount}
                                            <span>      Price per Item: </span>{item.price}€
                                        </p>
                                    </div>
                                    {index === order.customer_orders.length - 1 && (
                                        <p id="total"><span>Total: </span>{item.totalValue}€</p>
                                        )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default PreviousOrders;