import React from "react";
import Card from "./card";
import productlist from "./data";
import './displaycards.css';

function Displaycards({handleClick}) {
    return(
        <section>
            {
                productlist.map((item)=>(
                    <Card item={item} key={item.id} handleClick={handleClick}/>
                ))
            }
        </section>
    );
}

export default Displaycards;