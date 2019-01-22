import React from 'react';
import classes from './Logo.css';
import logoPng from '../../assets/images/burger-logo.png'

const logo = (props) =>(
    <div className={classes.Logo}>
        <img src={logoPng} alt='My Burger'/>
    </div>
)

export default logo;