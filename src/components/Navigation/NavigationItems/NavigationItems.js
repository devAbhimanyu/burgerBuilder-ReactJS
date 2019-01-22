import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) =>{
    
    let authentication=  <NavigationItem exact link='/signin'>SignIn</NavigationItem>;
    if(props.isAuthenticated){
        authentication=<React.Fragment>
                            <NavigationItem exact link='/orders'>Orders</NavigationItem>
                            <NavigationItem exact link='/logout'>Logout</NavigationItem>
                        </React.Fragment>
    }
    return(    
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link='/home' >Burger Builder</NavigationItem>
        {authentication}  
    </ul>
)
}
    


export default navigationItems;