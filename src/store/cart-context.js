
import React from "react";

const CartContext=React.createContext({
    items:[],
    totalamount:0,
    additem:(item)=>{},
    removeitem:(id)=>{},
    clearcart:()=>{}
});


export default CartContext;