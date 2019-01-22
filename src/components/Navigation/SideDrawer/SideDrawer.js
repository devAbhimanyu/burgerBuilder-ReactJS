import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Auxilary/Auxilary';


const sideDrawer = (props) =>{
    let attachesClasses = [classes.SideDrawer,classes.Close ];
    if(props.show){
        attachesClasses = [classes.SideDrawer,classes.Open ];
    }
    return(
        <Aux>
            <BackDrop show={props.show}  bdClicked={props.close} />
            <div className={attachesClasses.join(' ')} onClick={props.close} >
                <div className={classes.Logo}> 
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated}/>
                </nav>
            </div>
        </Aux>
    )

}

export default sideDrawer;