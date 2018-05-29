import React from 'react';
import styles from "./Menu.css";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = (props) => (
    <header className={styles.Menu}>
        <nav>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;