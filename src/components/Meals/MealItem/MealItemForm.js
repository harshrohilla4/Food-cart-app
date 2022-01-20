import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import React, { useRef,useState } from "react";

const MealIteamForm = (props) => {
  const enteredQuantityRef = useRef();
  const [validQuantity,setvalidQuantity]=useState(true);

  const onSubmitHandler = (event) => {
      event.preventDefault();

      const enteredQuantity=enteredQuantityRef.current.value;
      const enteredQuantityNumber=+enteredQuantity;

      if(enteredQuantity.trim().length ===0 || enteredQuantityNumber <1 || enteredQuantityNumber >5)
      {
          setvalidQuantity(false);
          return;
      }

      props.onAddtoCart(enteredQuantityNumber);
  };
  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        ref={enteredQuantityRef}
        label="Quantity"
        input={{
          id: "amount_" + props.id,
          number: "number",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button>+ADD</button>
      {!validQuantity && <p>Please select valid Quantity(1 to 5)</p>}
    </form>
  );
};
export default MealIteamForm;
