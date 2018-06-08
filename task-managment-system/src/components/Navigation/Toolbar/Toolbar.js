import React from 'react';
import "./Toolbar.css";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = (props) => (
    <header className="Toolbar">
        <nav>
            <NavigationItems isAdmin={props.isAdmin} logOut={props.logOut} />
        </nav>
    </header>
);

export default toolbar;