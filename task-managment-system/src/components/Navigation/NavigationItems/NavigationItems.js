import React from 'react';
import "./NavigationItems.css";
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationItem link="/tasks">Tasks</NavigationItem>
        {props.isAdmin ? <NavigationItem link="/users">Users</NavigationItem> : null}
        <NavigationItem link="/login" onClick={props.logOut} float="right">Log out</NavigationItem>
    </ul>
);

export default navigationItems;