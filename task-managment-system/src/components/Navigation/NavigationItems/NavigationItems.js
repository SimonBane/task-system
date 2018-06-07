import React from 'react';
import styles from "./NavigationItems.css";
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/tasks">Tasks</NavigationItem>
        {props.isAdmin ? <NavigationItem link="/users">Users</NavigationItem> : null}
        <NavigationItem link="/login" onClick={props.logOut} float="right">Log out</NavigationItem>
    </ul>
);

export default navigationItems;