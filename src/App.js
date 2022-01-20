

import Header from "./components/Layout/Header";
import { useState} from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart"
import CartProvider from "./store/CartProvider"



function App() {

  const [cartIsShown,setcartIsShown]=useState(false);

  const showCartHandler=()=>{
    setcartIsShown(true);
  }

  const HideCartHandler=()=>{
    setcartIsShown(false);
  }
  return (
    <CartProvider>
      { cartIsShown && <Cart onClose={HideCartHandler}/>}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
