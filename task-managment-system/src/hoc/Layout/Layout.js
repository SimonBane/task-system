import React, { Component } from "react";
import Aux from "../Auxiliary/Auxiliary";
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

export default class Layout extends Component {
    render() {
        return (
            <Aux>
                {this.props.isAuthenticated ?
                    <Toolbar isAdmin={this.props.isAdmin} logOut={this.props.logOut} />
                    : null}
            </Aux>
        );
    }
}