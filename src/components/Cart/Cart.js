import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {

  const Cartctx=useContext(CartContext);
  const [isCheckingout,setIsCheckingout]=useState(false);
  const TotalAmount=`$${Cartctx.totalamount.toFixed(2)}`;
  const haslength=Cartctx.items.length>0;

  const RemoveItemHandler=(id)=>{
     Cartctx.removeitem(id);
  }
  const AddItemHandler=(item)=>{
     Cartctx.additem({...item,amount:1});
  }

  const orderHandler=()=>{
    setIsCheckingout(true);
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {Cartctx.items.map((item) => (
        <CartItem 
        key={item.id} 
        name={item.name}
         amount={item.amount} 
         price={item.price} 
         onRemove={RemoveItemHandler.bind(null,item.id)} 
         onAdd={AddItemHandler.bind(null,item)}/>
      ))}
    </ul>
  );

  const actionComponents=  <div className={classes.actions}>
  <button className={classes["button--alt"]} onClick={props.onClose}>Cancel</button>
  {haslength && <button className={classes.button} onClick={orderHandler}>Order</button>}
</div>;

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{TotalAmount}</span>
      </div>
      {isCheckingout && <Checkout onCancel={props.onClose}/>}
      {!isCheckingout && actionComponents}
    </Modal>
  );
};
export default Cart;
