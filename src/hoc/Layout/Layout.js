import React, { Component } from 'react';

import Aux from '../Auxchange/Auxchange';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render () {
        return (
        <Aux>
            <Toolbar sideDrawerToggle={this.sideDrawerToggleHandler} />
            <SideDrawer 
                show={this.state.showSideDrawer} 
                clicked={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        );
    }  
}

export default Layout;