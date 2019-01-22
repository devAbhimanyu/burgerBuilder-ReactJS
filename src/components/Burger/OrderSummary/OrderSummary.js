import React,{Component} from 'react';
import Aux from '../../../hoc/Auxilary/Auxilary'
//import classes from './OrderSummary.css';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component{
    componentWillUpdate(){
    }


    render(){        
        const ingredientSummary = {...this.props.ingredients};

        const ingredientList= Object.keys(ingredientSummary).map(
            igKey => {
                return (<li key={igKey+1}>
                        <span style={{textTransform:'capitalize'}}>
                             {igKey} 
                        </span> : {this.props.ingredients[igKey]} 
                    </li>)
            }
        )        
    
        return (
            <Aux >
                <h3>Your Order</h3>
                <p> A delicious burger with the following ingredients: </p>
                <ul>
                    {ingredientList}
                </ul>
                <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clickHandler= {this.props.cancelClick}>Cancel</Button>
                <Button btnType="Success" clickHandler={this.props.continueClick}>Continue</Button>
            </Aux>
        )
    }
} 

export default OrderSummary;