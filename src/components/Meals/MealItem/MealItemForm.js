
import classes from "./MealItemForm.module.css"
import Input from "../../UI/Input"
const MealIteamForm=(props)=>{

    return (
        <form className={classes.form}>
            <Input label="Quantity" input={{
                id:"amount_"+props.id,
                number:"number",
                min:1,
                max:5,
                step:1,
                defaultValue:1

            }}/>
            <button>+ADD</button>
        </form>
    );
}
export default MealIteamForm;