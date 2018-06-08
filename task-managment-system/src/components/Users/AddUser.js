import React, { Component } from 'react';
import { SkyLightStateless } from 'react-skylight';

class AddUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: "",
                password: "",
                email: "",
                role: ""
            }
        }
    }

    onChangeHandler = (event, field) => {
        let updatedTask = this.state.user;
        updatedTask[field] = event.target.value;

        this.setState({ user: updatedTask });
    }

    addUser = () => {
        let users = JSON.parse(localStorage.getItem('users'));
        users.push(this.state.user);
        localStorage.setItem('users', JSON.stringify(users));

        this.props.gridUpdate(users);
        this.props.close();
    }

    render() {
        return (
            <div>
                <SkyLightStateless
                    isVisible={this.props.show}
                    onCloseClicked={this.props.close}
                    title="Add a user"
                >
                    <form className="Form">
                        <input type="text" placeholder="Username" onChange={(event) => this.onChangeHandler(event, "username")} />
                        <input type="text" placeholder="Password" onChange={(event) => this.onChangeHandler(event, "password")} />
                        <input type="text" placeholder="Email" onChange={(event) => this.onChangeHandler(event, "email")} />
                        <input type="text" placeholder="Role" onChange={(event) => this.onChangeHandler(event, "role")} />
                        <button onClick={this.addUser} className="btn btn-primary" >Add</button>
                    </form>
                </SkyLightStateless>
            </div>
        )
    }
}

AddUser.displayName = 'AddUser';

export default AddUser;
