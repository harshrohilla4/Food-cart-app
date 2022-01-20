import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext,useEffect,useState } from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
     const cartctx=useContext(CartContext);

     const {items}=cartctx;

     const numberofcartitems=items.reduce((curNumber,item)=>{
         return curNumber + item.amount;
     },0);
         const[BtnIsHighlighted,setBtnIsHighlighted]=useState(false);

         useEffect(()=>{
           if(items.length===0)
           {
             return;
           }
            setBtnIsHighlighted(true);

            const timer=setTimeout(()=>{
              setBtnIsHighlighted(false);
            },300)

            return ()=>{
              clearTimeout(timer);
            };
         },[items])

     const btnclasses=`${classes.button} ${BtnIsHighlighted ? classes.bump:""}`;
  return (
    <button className={btnclasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberofcartitems}</span>
    </button>
  );
};
export default HeaderCartButton;
