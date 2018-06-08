import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItem.css';

const navigationItem = (props) => (
    <li className="NavigationItem">
        <NavLink
            activeClassName="active"
            exact
            to={props.link} onClick={props.onClick} style={{float: props.float}}>{props.children}</NavLink>
    </li>
);

export default navigationItem;