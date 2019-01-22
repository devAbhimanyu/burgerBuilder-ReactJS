import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import * as actionDelegates from '../../../store/actions/index';


class Logout extends Component{
    componentDidMount(){
        this.props.logoutDelegate();
    }
    render(){
        return(
            <Redirect to='/signin' />
        )
    }
    
}


const mapDispactchToProps =dispatch =>{
    return{
        logoutDelegate: ()=>dispatch(actionDelegates.sessionLogout())
    }
}

export default connect(null,mapDispactchToProps)(Logout);