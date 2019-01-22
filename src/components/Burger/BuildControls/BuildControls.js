import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label:"Salad", type:"salad"},
    {label:"Bacon", type:"bacon"},
    {label:"Meat", type:"meat"},
    {label:"Cheese", type:"cheese"}
]


const buildControls =(props)=>{
    
    return (
        <div className={classes.BuildControls}>
            <p>Current Price : <strong>{props.price.toFixed(2)}</strong> </p>
            {controls.map((ele)=>{
               return <BuildControl 
                    key={ele.label} 
                    label={ele.label} 
                    added ={() => props.ingredientAdded(ele.type)}
                    removed ={() => props.ingredientRemoved(ele.type)}
                    disabledProp = {props.disabled[ele.type]}
                />
            })}
            <button 
                className={classes.OrderButton} 
                disabled={!props.purchaseable}
                onClick= {props.orderBurger}
            >{props.isAuthenticated?' Order Now':'Sign Up To Order'  }</button>
        </div>
    );
}

export default buildControls;