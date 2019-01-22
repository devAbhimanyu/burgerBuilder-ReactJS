import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../../shared/utility';

const orderState ={
    orders:[],
    loading:false,
    orderPurchased:false
}

const purchaseBurgerStart = ( state, action ) => {
    return updateObject(state,{loading:true});
}
const purchaseBurgerSuccess = ( state, action ) => {
    return updateObject(state,{
        ...state,
        loading:false,
        orderPurchased:true
    });
}

const purchaseBurgerFail = ( state, action ) => {
    return updateObject(state,{loading:false});
}

const purchaseInit = ( state, action ) => {
    return updateObject( state, { orderPurchased: false });
};

const fetchOrdersStart = ( state, action ) => {
    return updateObject(state,{loading:true});
}
const fetchOrdersSuccess = ( state, action ) => {
    return updateObject( state, {
        orders:  action.payload.orderData,
        loading: false
    } );
}
const fetchOrdersFail = ( state, action ) => {
    return updateObject(state,{loading:false});
}


const orderReducer = (state =orderState,action)=>{
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state,action);                
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state,action);            
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state,action); 
        case actionTypes.PURCHASE_INIT: return purchaseInit(state,action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state,action);
        case actionTypes.FETCH_ORDERS_SUCCESS:return fetchOrdersSuccess(state,action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state,action);
        default: return state;
    }
}

export default orderReducer;