import React from 'react';
import styles from "./Toolbar.css";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = (props) => (
    <header className="row">
        <div className="nav">
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <NavigationItems isAdmin={props.isAdmin} logOut={props.logOut} />
                    </div>
                </div>
            </nav>
        </div>
    </header>
);

export default toolbar;