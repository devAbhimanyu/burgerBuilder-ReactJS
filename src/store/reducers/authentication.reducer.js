import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../../shared/utility';

const authState ={
    token:null,
    userId:null,
    error:null,
    loading:false,
    postAuthPath:'/'
}

const authenticationStart = (state,action) =>{
    return updateObject(state, {error:null,loading:true});
}
const authenticationSuccess = (state,action) =>{
    const updatedData = {
        token:action.payload.token,
        userId:action.payload.userId,
        error:null,
        loading:false
    }
    return updateObject(state, updatedData);
}
const authenticationFail = (state,action) =>{
    return updateObject(state, {error:action.payload.error,loading:false});
}

const sessionLogout = (state,action)=>{
    return updateObject(state, {
           token:null,
           userId:null
        });
}

const postAuthenticationPath =(state,action)=> {
    return updateObject(state,{postAuthPath:action.payload.isBuilding})
}

const authReducer = (state = authState,action)=>{
    switch(action.type){
        case actionTypes.AUTHENTICATION_START: return authenticationStart(state,action);
        case actionTypes.AUTHENTICATION_SUCCESS:return authenticationSuccess(state,action);
        case actionTypes.AUTHENTICATION_FAIL: return authenticationFail(state,action);
        case actionTypes.AUTHENTICATION_LOGOUT: return sessionLogout(state,action);
        case actionTypes.SET_AUTHENTICATION_PATH_REDIRECT: return postAuthenticationPath(state,action);
        default: return state;
    }
}

export default authReducer;