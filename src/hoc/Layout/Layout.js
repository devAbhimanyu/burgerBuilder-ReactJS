import React,{Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../Auxilary/Auxilary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state={
        showSideDrawer:false
    }

    sideDrawerCloseHandler =()=>{
        this.setState({showSideDrawer:false})
    }

    drawerToggleHandler =()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer}
        })
    }

    render(){
        return(
            <Aux>
                <Toolbar isAuthenticated={this.props.authenticated} clickDelegate={this.drawerToggleHandler}/>
                <SideDrawer isAuthenticated={this.props.authenticated} show={this.state.showSideDrawer} open={this.sideDrawerOpenHandler} close={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>)
    }
} 

const mapStateToProps =state =>{
    return{
        authenticated:state.authenticationReducer.token !== null
    }
}

export default connect(mapStateToProps)(Layout);


