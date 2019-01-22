import * as actionType from '../actions/actionsTypes';
import {updateObject} from '../../shared/utility';

const initialState ={
    ingredients:null,
    totalPrice:4,
    error:false,
    building:false
}

//global constants are name in all caps
const INGREDIENTS_PRICE ={
    salad:0.4,
    bacon:1.2,
    cheese:0.9,
    meat:1.5,
    }

const addIngredient = ( state, action ) => {
    const updatedIngredient = {
        [action.payload.ingredient] : state.ingredients[action.payload.ingredient] +1
    }
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
    const updatedState = {
        ingredients:updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.payload.ingredient],
        building:true
    }    
    return updateObject(state,updatedState);
}

const removeIngredient = ( state, action ) => {
                const removedIngredient = {                
                [action.payload.ingredient] : state.ingredients[action.payload.ingredient] - 1,
            }
            const updatedIngredientsRem = updateObject(state.ingredients,removedIngredient)
            const updatedStateRem ={
                ingredients:updatedIngredientsRem,
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.payload.ingredient],
                building:true
            }
            return updateObject(state,updatedStateRem);
}
const setIngredients = ( state, action ) => {
    return updateObject(state,{
        ingredients:action.payload.ingredients,
        totalPrice:4,
        error:false,
        building:false
    }) ;
}
const fetchIngredientsFailed = ( state, action ) => {
    return updateObject(state,{ error:true })   ;
}

const rootReducder = (state = initialState, action)=>{
    switch(action.type){
        case actionType.ADD_INGREDIENT: return addIngredient(state,action);
        case actionType.REMOVE_INGREDIENT: return removeIngredient(state,action);
        case actionType.SET_INGREDIENTS: return setIngredients(state,action);
        case actionType.FETCH_INGREDIENTS_FAILED:return fetchIngredientsFailed(state,action);                 
        default:return state;
    }
}
// case actionType.ADD_INGREDIENT:
// const updateIngredients = {...state.ingredients};
// updateIngredients[action.payload.ingredient] = state.ingredients[action.payload.ingredient] +1; 
// return {
    // ...state,
    // ingredients:updateIngredients
// };


export default rootReducder;