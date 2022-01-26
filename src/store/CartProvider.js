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
        
        const existingCartItemIndex=state.items.findIndex((item)=>item.id===action.id);
        const existingCartItem=state.items[existingCartItemIndex];
        const updatedTotalamount=state.totalamount - existingCartItem.price;
        let updatedItems;
        

          if(existingCartItem.amount===1){
            updatedItems=state.items.filter((item)=> item.id!==action.id);
          }
          else{
             const updatedItem={...existingCartItem,amount:existingCartItem.amount-1};
             updatedItems=[...state.items];
             updatedItems[existingCartItemIndex]=updatedItem;
          }

          return {
            items:updatedItems,
            totalamount:updatedTotalamount
          };
        

    }
    if(action.type==="CLEAR")
    {
      return defaultCartState;
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

  const clearCartHandler=()=>{
    dispatchCartAction({type:"CLEAR"});
  }

  const cartcontext = {
    items: cartState.items,
    totalamount: cartState.totalamount,
    additem: additemHandler,
    removeitem: removeitemHandler,
    clearcart:clearCartHandler
  };

  return (
    <CartContext.Provider value={cartcontext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
