import React, { Component } from 'react';
import { SkyLightStateless } from 'react-skylight';

export default class EditUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user
        }
    }

    onChangeHandler = (event, field) => {
        const usr = this.state.user;
        usr[field] = event.target.value;

        this.setState({
            user: usr
        });
    }

    editUserInformationHandler = () => {
        const updatedUser = this.state.user;

        let storedUsers = JSON.parse(localStorage.getItem('users'));
        let userIndex = 0;
        for (let user of storedUsers) {
          if (user.username === updatedUser.username) {
            break;
          }
          userIndex++;
        }
        storedUsers[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(storedUsers));

        this.updateUserInformationHandler();
        this.props.close();
    }

    updateUserInformationHandler = () => {
        const user = this.state.user;
        this.props.userUpdate(user);
    }

    render() {
        return (
            <div>
                <SkyLightStateless
                    isVisible={this.props.show}
                    onCloseClicked={this.props.close}
                    title={"Edit " + this.state.user.username + "'s information"}
                >
                    <form className="Form">
                        <input type="text" placeholder="Password" onChange={(event) => this.onChangeHandler(event, "password")} value={this.state.user.password}/>
                        <input type="text" placeholder="Email" onChange={(event) => this.onChangeHandler(event, "email")} value={this.state.user.email}/>
                        <input type="text" placeholder="Role" onChange={(event) => this.onChangeHandler(event, "role")} value={this.state.user.role} />
                        <button onClick={this.editUserInformationHandler} className="btn btn-primary" >Edit</button>
                    </form>
                </SkyLightStateless>
            </div>
        )
    }
}