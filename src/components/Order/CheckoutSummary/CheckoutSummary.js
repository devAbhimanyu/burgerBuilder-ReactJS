import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css'; 

const checkoutSummary = (props) => {
    return(
        <div>
            <div className={classes.CheckoutSummary}>
                <h1>Your Order Summary</h1>
            </div>
            <Burger className={classes} ingredients={props.ingredients}/>

            <div className={classes.CheckoutSummary}>  
                <Button btnType="Danger" clickHandler={props.onCheckoutCancel}>Cancel</Button>
                <Button btnType="Success" clickHandler={props.onCheckoutContinue}>Continue</Button>
            </div>
        </div>        
    );

}

export default checkoutSummary;