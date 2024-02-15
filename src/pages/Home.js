import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Cart from "../components/cart";
import Displaycards from "../components/displaycards";
import { ref, set, push } from "firebase/database";
import { db } from "../firebase/firebase";
import { useAuth } from "../firebase/AuthProvider";


function Home() {

    const { currentUser } = useAuth();
    const [cart, setCart] = useState([]);
    const [count, setCounts] = useState(1);
    const [itemsArray, setItemsArray] = useState([]);

    function handleCount(itemId) {
        setCounts((prevCounts) => {
            const newCounts = { ...prevCounts };
            if (newCounts[itemId] !== undefined) {
                newCounts[itemId] += 1;
            } else {
                newCounts[itemId] = 1;
            }
            return newCounts;
        });
    }

    useEffect(() => {
        let totalValue = 0;
        const updatedItemsArray = cart.map((item) => {
            const itemid = item.id
            const amount = count[item.id] || 0;
            const price = item.price;
            const itemTotal = amount * price;
            totalValue += itemTotal;

            return {
                itemid: itemid,
                title: item.title,
                amount: amount,
                price: price,
                itemTotal: itemTotal,
                totalValue: totalValue,
            };
        });
        setItemsArray(updatedItemsArray);
    }, [cart, count]);

    function handleClick(item) {
        const isPresent = cart.some((product) => item.id === product.id);
        if (isPresent) {
            handleCount(item.id);
        } else {
            setCart([...cart, item]);
            handleCount(item.id);
        }
    }

    function handleReset() {
        setCounts(0);
        setCart([]);
        setItemsArray([]);
    }

    function handleSubmit() {
        const isPresent = itemsArray.some((item) =>
            cart.some((product) => item.title === product.title)
        );
        if (isPresent) {
            console.log({ itemsArray });

            function writeUserOrder(customerId, name, email, date, order) {
                const user_order_ref = ref(db, 'customers/' + customerId + '/customer_orders');
                const new_order_ref = push(user_order_ref);

                set(new_order_ref, {
                    customer_name: name,
                    customer_email: email,
                    order_date: date,
                    customer_orders: order
                });
            }
            const date_of_order = new Date().toLocaleString()
            writeUserOrder(
                currentUser?.uid,
                currentUser?.displayName,
                currentUser?.email,
                date_of_order,
                itemsArray)

            setCounts(0);
            setCart([]);
            setItemsArray([]);
        }
    }

    return (
        <>
            <Navbar />
            <Cart
                cart_item={cart}
                size={cart.length}
                counter={count}
                handleReset={handleReset}
                handleSubmit={handleSubmit}
            />
            <Displaycards handleClick={handleClick} />
        </>
    );
}

export default Home;