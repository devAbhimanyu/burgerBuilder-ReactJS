import * as actionTypes from './actionsTypes';
import axios from 'axios';
const apiKey = '';

export const authenticationStart = ()=>{
    return {
        type:actionTypes.AUTHENTICATION_START
    }
}
export const authenticationSuccess = (authData)=>{
    return {
        type:actionTypes.AUTHENTICATION_SUCCESS,
        payload:{
            token:authData.idToken,
            userId:authData.localId,
        }
    }  
}
export const authenticationFail = (err)=>{
    return {
        type:actionTypes.AUTHENTICATION_FAIL,
        payload:{
            error:err
        }
    }
}

export const sessionLogout = ()=>{
    localStorage.removeItem('BBTokenId');
    localStorage.removeItem('BBExpDate');
    localStorage.removeItem('BBUserId');
    return{
        type:actionTypes.AUTHENTICATION_LOGOUT
    }
}

export const checkAuthTimeout = (expTime)=>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(sessionLogout());
        },expTime*1000);
    }
}

export const authenticate =(email,password,isSignUp)=>{
    return dispatch=>{
        dispatch(authenticationStart());
        const authData ={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+apiKey;
        if(!isSignUp){
            url ='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+apiKey;
        }
        axios.post(url,authData)
        .then(response=>{
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('BBTokenId',response.data.idToken);
            localStorage.setItem('BBExpDate',expirationDate);
            localStorage.setItem('BBUserId',response.data.localId);
            dispatch(authenticationSuccess(response.data));
            dispatch(checkAuthTimeout(response.data.expiresIn))           
        })
        .catch(err=>{
            dispatch(authenticationFail(err.response.data.error));
        })
    }
}

export const postAuthenticationPath =(isBuilding)=>{
    return {
        type:actionTypes.SET_AUTHENTICATION_PATH_REDIRECT,
        payload:{
            isBuilding:isBuilding
        }
    }
}

export const checkAuthenticationState =()=>{
    return dispatch => {
        const token = localStorage.getItem('BBTokenId');
        if(!token){
            dispatch(sessionLogout());
        }else{
            const expirationTime =new Date(localStorage.getItem('BBExpDate'));
            if(expirationTime>new Date()){
                const localId= localStorage.getItem('BBUserId');
                dispatch(authenticationSuccess({idToken:token,localId:localId}));
                dispatch(checkAuthTimeout((expirationTime.getTime()-new Date().getTime())/1000 ) );
            }else{
                dispatch(sessionLogout());
            }
        }        
    }
}


