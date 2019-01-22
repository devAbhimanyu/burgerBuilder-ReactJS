import React, { Component } from 'react';
import {connect} from 'react-redux';
import Layout from '../../hoc/Layout/Layout'
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import {Route,Redirect, Switch, withRouter}  from 'react-router-dom';
import Logout from '../Authentication/Logout/Logout'
import * as actionDelegates from '../../store/actions/index';
import lazyComponentLoader from '../../hoc/LazyLoader/LazyLoader';

const AsyncCheckout = lazyComponentLoader(() => {
  return import('../Checkout/Checkout');
});
const AsyncAuth = lazyComponentLoader(() => {
  return import('../Authentication/Authentication');
});
const AsyncOrders = lazyComponentLoader(() => {
  return import('../Orders/Orders');
});

class App extends Component {
  componentDidMount(){
    this.props.checkAuthenticationStateDelegate();
  }

  render() {
    let routes = (
      <Switch>
          <Route path='/home' exact component={BurgerBuilder} />
          <Route path='/signin' component={AsyncAuth}/>
          <Redirect from='/' to='/home' />
      </Switch>
    ) 
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
            <Route path='/home' exact component={BurgerBuilder} />
            <Route path='/checkout' component={AsyncCheckout}/>
            <Route path='/orders' component={AsyncOrders}/>
            <Route path='/signin' component={AsyncAuth}/>
            <Route path='/logout' component={Logout}/>
            <Redirect from='/' to='/home' />
        </Switch>
      ) 
    }
    return (
      <div >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}


const mapStatetoProps = state=>{
  return{
    isAuthenticated:state.authenticationReducer.token !== null
  }
}
const mapDispactchToProps =dispatch =>{
  return{
    checkAuthenticationStateDelegate:() => dispatch(actionDelegates.checkAuthenticationState())
  }
}

export default withRouter(connect(mapStatetoProps,mapDispactchToProps)(App));
