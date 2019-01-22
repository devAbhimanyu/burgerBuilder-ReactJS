import React,{Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactInfo from './Contact/ContactInfo';
import {connect} from 'react-redux';

class Checkout extends Component{
    componentWillMount(){

    }


    checkoutCancelHandler= () =>{
        this.props.history.goBack();
    }

    checkoutContinueHandler =()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let summary = <Redirect to='/' />;
        if(this.props.ingredientsRED){
            const purchaseRedirect = this.props.orderPurchasedRED?<Redirect to='/'/>:null;
            summary =
            <div>
                {purchaseRedirect}
                <CheckoutSummary 
                    ingredients={this.props.ingredientsRED}
                    onCheckoutCancel={this.checkoutCancelHandler}
                    onCheckoutContinue={this.checkoutContinueHandler}/>
                <Route path={this.props.match.path + '/contact-data'} component={ContactInfo} />
            </div>         
        }
        return summary
    }
}

const mapPropsToState =state =>{
    return{
        ingredientsRED:state.burgerReducer.ingredients,
        totalPriceRED:state.burgerReducer.totalPrice,
        orderPurchasedRED: state.orderReducer.orderPurchased
    }
}

export default connect(mapPropsToState)(Checkout);