import reducer from './authentication.reducer';
import * as actionTypes from '../actions/actionsTypes';

describe('authentication.reducer',()=>{
    const initialState ={
        token:null,
        userId:null,
        error:null,
        loading:false,
        postAuthPath:'/'
    }

    it('should return initial state',()=>{
        expect(reducer(undefined,{})).toEqual(initialState);
    });

    it('should set token at login',()=>{
        expect(reducer(initialState,{
            type:actionTypes.AUTHENTICATION_SUCCESS,
            payload:{
                token:'idToken',
                userId:'localId',
            }
        })).toEqual({
            token:'idToken',
            userId:'localId',
            error:null,
            loading:false,
            postAuthPath:'/'
        });
    });
})