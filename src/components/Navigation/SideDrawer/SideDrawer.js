import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop 
                show={props.show} 
                clicked={props.clicked}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="11%" margin="32px"/>
                <nav>
                    <NavigationItems />
                </nav> 
            </div>
        </Aux>
       
    );
}

export default sideDrawer;