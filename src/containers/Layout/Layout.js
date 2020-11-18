import React, {useState} from 'react';
import { connect } from 'react-redux';
 
import Auxillary from '../../hoc/Auxillary/Auxillary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {

    const [sideDrawerState, setSideDrawerState] = useState({
        showSideDrawer: false
    });

    const closeSideDrawerHandler = () => {
        setSideDrawerState({
            showSideDrawer: false
        });
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });

    }

    return (
        <Auxillary>
        <div>
            <Toolbar auth={props.isAuthenticated} toggle={sideDrawerToggleHandler} />
            <SideDrawer auth={props.isAuthenticated} open={sideDrawerState.showSideDrawer} closed={closeSideDrawerHandler}  />
        </div>
        <main className={classes.Content}>
            {props.children}
        </main>    
        </Auxillary>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    };
}

export default connect(mapStateToProps)(Layout);