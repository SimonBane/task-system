import React from 'react';
import styles from "./Toolbar.css";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <nav className={styles.DesktopOnly}>
            <NavigationItems logOut={props.logOut}/>
        </nav>
    </header>
);

export default toolbar;