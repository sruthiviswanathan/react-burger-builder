import React, {useState} from 'react';
 
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
            <Toolbar toggle={sideDrawerToggleHandler} />
            <SideDrawer open={sideDrawerState.showSideDrawer} closed={closeSideDrawerHandler}  />
        </div>
        <main className={classes.Content}>
            {props.children}
        </main>    
        </Auxillary>
    );
};

export default Layout;