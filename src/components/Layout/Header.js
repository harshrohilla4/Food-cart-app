
import react from "react"
import classes from "./Header.module.css"
import React from "react";
import mealsimg from "../../assets/meals.jpg"
import HeaderCartButton from "./HeaderCartButton";

const Header=()=>{

    return (
        <React.Fragment>
        <header className={classes.header}>
            <h1>Your Meals</h1>
            <HeaderCartButton></HeaderCartButton>
        </header>
        <div className={classes["main-image"]}>
            <img src={mealsimg} alt="Table full of mouthwatering dishes"></img>
        </div>
        </React.Fragment>
    )
}

export default Header