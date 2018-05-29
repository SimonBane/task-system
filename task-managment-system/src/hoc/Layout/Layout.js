import React, { Component } from "react";
import Aux from "../Auxiliary/Auxiliary";
import Menu from '../../components/Navigation/Menu/Menu';

export default class Layout extends Component {
    render() {
        return (
            <Aux>
                <Menu />
            </Aux>
        );
    }
}