import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { Fragment } from "react";

const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const Cartctx = useContext(CartContext);
  const [isCheckingout, setIsCheckingout] = useState(false);
  const TotalAmount = `$${Cartctx.totalamount.toFixed(2)}`;
  const haslength = Cartctx.items.length > 0;

  const RemoveItemHandler = (id) => {
    Cartctx.removeitem(id);
  };
  const AddItemHandler = (item) => {
    Cartctx.additem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckingout(true);
  };

  const orderSubmitHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://react-https-48668-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: Cartctx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    Cartctx.clearcart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {Cartctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={RemoveItemHandler.bind(null, item.id)}
          onAdd={AddItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const actionComponents = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Cancel
      </button>
      {haslength && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{TotalAmount}</span>
      </div>
      {isCheckingout && (
        <Checkout onConfirm={orderSubmitHandler} onCancel={props.onClose} />
      )}
      {!isCheckingout && actionComponents}
    </Fragment>
  );

  const isSubmittingModalContent = (
    <Fragment>
      <p>Sending your order..!!</p>
    </Fragment>
  );
  const didSubmitModalContent = (
    <Fragment>
      <p>Your order is Sucessfull..!! Keep Ordering..!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && !didSubmit && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};
export default Cart;
