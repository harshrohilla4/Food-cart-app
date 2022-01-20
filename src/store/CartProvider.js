import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState={
    items:[],
    totalamount:0
};

const cartReducer=(state,action)=>{

    if(action.type==="ADD_ITEM")
    {
        
        const updatedTotalamount=state.totalamount + action.item.price * action.item.amount;
        const existingCartItemIndex=state.items.findIndex((item)=>item.id===action.item.id);
        const existingCartItem=state.items[existingCartItemIndex];
        
        let updatedItems;
        if(existingCartItem){

          const updatedItem={
            ...existingCartItem,
            amount:existingCartItem.amount + action.item.amount
          };
          updatedItems=[...state.items];
          updatedItems[existingCartItemIndex]=updatedItem;
        }
        else{
          updatedItems=state.items.concat(action.item);

        }

        return {
            items:updatedItems,
            totalamount:updatedTotalamount
        };
    }
    if(action.type==="REMOVE_ITEM")
    {

    }
    return defaultCartState;
}
const CartProvider = (props) => {
    
    const[cartState,dispatchCartAction]=useReducer(cartReducer,defaultCartState);

  const additemHandler = (item) => {
      dispatchCartAction({type:"ADD_ITEM",item:item});
   };

  const removeitemHandler = (id) => {
      dispatchCartAction({type:"REMOVE_ITEM",id:id});
  };

  const cartcontext = {
    items: cartState.items,
    totalamount: cartState.totalamount,
    additem: additemHandler,
    removeitem: removeitemHandler,
  };

  return (
    <CartContext.Provider value={cartcontext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;