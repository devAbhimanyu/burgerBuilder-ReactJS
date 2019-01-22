import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionDelegate from '../../store/actions/index';
import Aux from '../../hoc/Auxilary/Auxilary';
import Modal from '../../components/UI/Modal/Modal'
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';


export class BurgerBuilder extends Component{
    constructor(props){
        super(props);
        this.state={
            purchasing:false,
        }
    }

    componentDidMount(){
        this.props.onInitIngredientFetch();
    }


    purchaseHandler=()=>{
        if(this.props.authenticated){
            this.setState({purchasing:true});
        }else{
            this.props.postAuthenticationPathDelegate('/checkout');
            this.props.history.push({
                pathname:'/signin'
            });
        }
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false});        
    }

    purchaseContinueHandler = ()=>{
        this.props.purchaseInitDelegate();

        this.props.history.push({
            pathname:'/checkout'
        });
    }

    updatePurchaseState(updatedList){
        const ingredients = {...updatedList};

        const sum = Object.keys(ingredients).map(
            igKey =>{
                return ingredients[igKey];
            }
        ).reduce((sum, el)=>{
           return sum += el
        },0);

        return sum>0;
    }

    render(){
        const disabledInfo = {...this.props.ingredientRED};

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }

        let orderSummary = null;
        let burger= this.props.errorRED?<p> Error while fetching the ingredients </p>: <Spinner/>

        if(this.props.ingredientRED){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredientRED} />
                    <BurgerControls 
                    ingredientAdded = {this.props.addIngredientDelegate} 
                    ingredientRemoved = {this.props.removeIngredientDelegate}
                    price= {this.props.totalPriceRED}
                    disabled = {disabledInfo}
                    purchaseable = {this.updatePurchaseState(this.props.ingredientRED)} 
                    orderBurger ={this.purchaseHandler}   
                    isAuthenticated={this.props.authenticated}
                />
                </Aux>            
            );
            orderSummary =(
                <OrderSummary 
                                ingredients={this.props.ingredientRED} 
                                cancelClick={this.purchaseCancelHandler} 
                                continueClick={this.purchaseContinueHandler}
                                price={this.props.totalPriceRED}
                         />
            )
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                    {burger}
            </Aux>
        )
    }
}

const mapStatetoProps = state=>{
    return{
        ingredientRED: state.burgerReducer.ingredients,
        totalPriceRED: state.burgerReducer.totalPrice, 
        errorRED:state.burgerReducer.error,
        orderPurchasedRED: state.orderReducer.orderPurchased,
        authenticated:state.authenticationReducer.token !== null
    }
}

const mapDispactchToProps =dispatch =>{
    return{
        addIngredientDelegate: (ingredientType)=>dispatch(actionDelegate.addIngredient(ingredientType)),
        removeIngredientDelegate: (ingredientType)=>dispatch(actionDelegate.removeIngredient(ingredientType)),
        onInitIngredientFetch: () => dispatch(actionDelegate.initIngredientFetch()),
        purchaseInitDelegate:()=> dispatch(actionDelegate.purchaseInit()),
        postAuthenticationPathDelegate:(path) => dispatch(actionDelegate.postAuthenticationPath(path))
    }
}

export default connect(mapStatetoProps,mapDispactchToProps)(withErrorHandler(BurgerBuilder,axios));