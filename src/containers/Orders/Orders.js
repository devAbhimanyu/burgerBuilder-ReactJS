import React,{Component} from 'react';
import {connect} from 'react-redux'
import classes from './Orders.css';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionDelegate from '../../store/actions/index';
class Orders extends Component{
    
    componentDidMount = () => {
        this.props.fetchOrderDelegate(this.props.tokenRed, this.props.userIdRED);
    }
    
    render(){
        let orderDetails= <Spinner />
        if(!this.props.loadingRED){
            orderDetails = this.props.ordersRED.map(order=>{
                return <Order key ={order.id} ingredients={order.ingredients} price={order.price} />
            });
        }
        return(
            <div className={classes.ContactInfo}>
                <h4>Your Order</h4>
                {orderDetails}
            </div>
        );
    }
}

const mapStateToProps =state =>{
    return{
        ordersRED: state.orderReducer.orders,
        loadingRED: state.orderReducer.loading,
        errorRED:state.orderReducer.error,
        tokenRed:state.authenticationReducer.token,
        userIdRED:state.authenticationReducer.userId
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        fetchOrderDelegate:(token,userId)=>dispatch(actionDelegate.fetchOrders(token,userId))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));
