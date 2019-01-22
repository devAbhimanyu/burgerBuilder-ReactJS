import React from 'react';
import classes from './Order.css';

const order = (props) =>{
    const ingredients = Object.keys(props.ingredients).map((key)=>{
        return {name:key, value: props.ingredients[key]}
    });

    const ingredientSummary = ingredients.map(ele =>{
        return <span key={ele.name+112} style={{textTransform:'capitalize', display:'inline-block', margin:'0 8px', border:'1px solid #ccc', padding:'5px'}}>
        {ele.name} {ele.value}</span>
    })

    return(
        <div className={classes.Order}>
            <p>Ingredients : {ingredientSummary}</p>
            <p>Price: USD {Number.parseFloat(props.price).toFixed(2)}</p>
        </div>
    )
}

export default order;