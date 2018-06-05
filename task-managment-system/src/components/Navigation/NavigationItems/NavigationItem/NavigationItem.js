import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={styles.NavigationItem}>
        <NavLink
            activeClassName={styles.active}
            exact
            to={props.link} onClick={props.onClick} style={{float: props.float}}>{props.children}</NavLink>
    </li>
);

export default navigationItem;