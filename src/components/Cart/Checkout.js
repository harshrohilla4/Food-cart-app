import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const IsEmpty=(value)=>value.trim()==="";
const IsSixChar=(value)=>value.trim().length===6;
const Checkout = (props) => {

    const nameInputRef=useRef();
    const streetInputRef=useRef();
    const postalcodeInputRef=useRef();
    const cityInputRef=useRef();
    
    const[formInputValidity,setFormInputValidity]=useState({
        name:true,
        street:true,
        postalcode:true,
        city:true
    });

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName=nameInputRef.current.value;
    const enteredStreet=streetInputRef.current.value;
    const enteredPostalcode=postalcodeInputRef.current.value;
    const enteredCity=cityInputRef.current.value;

    const enteredNameIsValid=!IsEmpty(enteredName);
    const enteredStreetIsValid=!IsEmpty(enteredStreet);
    const enteredPostalcodeIsValid=IsSixChar(enteredPostalcode);
    const enteredCityIsValid=!IsEmpty(enteredCity);

    const formIsValid= enteredNameIsValid && enteredStreetIsValid && enteredPostalcodeIsValid && enteredCityIsValid;

    setFormInputValidity({
        name:enteredNameIsValid,
        street:enteredStreetIsValid,
        postalcode:enteredPostalcodeIsValid,
        city:enteredCityIsValid
    });

    if(!formIsValid)
    {
        return;
    }
    
    props.onConfirm({
        name:enteredName,
        street:enteredStreet,
        postalcode:enteredPostalcode,
        city:enteredCity
    });

  };

  const nameInputClasses=`${classes.control} ${formInputValidity.name? "":classes.invalid}`;
  const streetInputClasses=`${classes.control} ${formInputValidity.street? "":classes.invalid}`;
  const postalcodeInputClasses=`${classes.control} ${formInputValidity.postalcode? "":classes.invalid}`;
  const cityInputClasses=`${classes.control} ${formInputValidity.city? "":classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValidity.name && <p>Name cannot be Empty</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputValidity.street && <p>Street cannot be Empty</p>}
      </div>
      <div className={postalcodeInputClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalcodeInputRef} />
        {!formInputValidity.postalcode && <p>Postal code should have 6 digits</p>}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputValidity.city && <p>City cannot be Empty</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;