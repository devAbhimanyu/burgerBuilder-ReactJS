import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientType)=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        payload:{ingredient: ingredientType}
    }
}

export const removeIngredient = (ingredientType)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        payload:{ingredient: ingredientType}
    }
}

export const setIngredients = (ingredients)=>{
    return{
        type:actionTypes.SET_INGREDIENTS,
        payload:{ingredients: ingredients}
    }
}

export const fetchIngredientsFailed = ()=>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredientFetch =()=>{
    return dispatch =>{
        axios.get('/Ingredient.json')
        .then(response=>{
            const ingredients = response.data;
            dispatch(setIngredients(ingredients));
        })
        .catch(error =>{
            dispatch(fetchIngredientsFailed())
        })
    }

}
