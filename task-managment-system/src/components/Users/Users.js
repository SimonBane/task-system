import React, { Component } from "react";
import AddUser from './AddUser';
import EditUser from './EditUser';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

export default class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            showAdd: false,
            showEdit: false,
            currentUser: {},
            gridOptions: {
                context: {
                    componentParent: this
                }
            },
            columnDefs: [
                {
                    headerName: "Username",
                    field: "username",
                    width: 50
                },
                {
                    headerName: "Email",
                    field: "email",
                    width: 50
                },
                {
                    headerName: "Password",
                    field: "password",
                    width: 50
                },
                {
                    headerName: "Role",
                    field: "role",
                    width: 50
                },
                {
                    headerName: "Delete",
                    field: "delete",
                    width: 30,
                    cellRenderer: this.deleteButtonHandler.bind(props),
                    cellStyle: {
                        outline: "none",
                        border: "none"
                    }
                },
                {
                    headerName: "Edit",
                    field: "edit",
                    width: 30,
                    cellRenderer: this.editButtonHandler.bind(props),
                    cellStyle: {
                        outline: "none",
                        border: "none"
                    }
                }
            ],
            onGridReady: function (params) {
                params.api.sizeColumnsToFit();
            },
            defaultColDef: { editable: false }
        }
    }

    deleteButtonHandler = (props) => {
        const eSpan = document.createElement("button");
        eSpan.innerHTML = "Delete";
        eSpan.style = "width: 100%; height: 90%; text-align: center;";
        eSpan.addEventListener('click', () => this.deleteRow(props));
        return eSpan;
    }

    editButtonHandler = (props) => {
        const eSpan = document.createElement("button");
        eSpan.innerHTML = "Edit";
        eSpan.style = "width: 100%; height: 90%; text-align: center;";
        eSpan.addEventListener('click', () => this.editRow(props));
        return eSpan;
    }

    deleteRow = (props) => {
        let storedUsers = JSON.parse(localStorage.getItem('users'));
        let userIndex = 0;
        for (let user of storedUsers) {
            if (user.username === props.data.username && user.email === props.data.email) {
                break;
            }
            userIndex++;
        }
        storedUsers.splice(userIndex, 1);
        localStorage.setItem('users', JSON.stringify(storedUsers));
        this.setState({ users: storedUsers });
    }

    editRow = (props) => {
        this.setState({
            currentUser: {
                username: props.data.username,
                password: props.data.password,
                email: props.data.email,
                role: props.data.role
            },
            showEdit: true
        });
    }

    componentDidMount() {
        let storedUsers = JSON.parse(localStorage.getItem('users'));
        this.setState({ users: storedUsers });
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    manipulateAddUser = () => {
        this.setState({ showAdd: !this.state.showAdd });
    }

    manipulateEditUser = () => {
        this.setState({ showEdit: !this.state.showEdit });
    }

    updateGrid = (usersProps) => {
        this.setState({ users: usersProps });
    }

    updateCurrentUser = (editedUser) => {
        this.setState({ currentUser: editedUser });
        const rowNode = this.gridApi.getRowNode(this.state.currentUser.username);

        rowNode.setDataValue("username", this.state.currentUser.username);
        rowNode.setDataValue("password", this.state.currentUser.password);
        rowNode.setDataValue("email", this.state.currentUser.email);
        rowNode.setDataValue("role", this.state.currentUser.role);
    }

    render() {
        const divStyle = {
            boxSizing: "border-box",
            height: "100%",
            width: "100%"
        }

        const adder = this.state.showAdd
            ? <AddUser show={this.state.showAdd} close={() => this.manipulateAddUser()} gridUpdate={this.updateGrid} />
            : null;

        const editor = this.state.showEdit
            ? <EditUser
                show={this.state.showEdit}
                close={() => this.manipulateEditUser()}
                user={this.state.currentUser}
                userUpdate={this.updateCurrentUser} />
            : null;

        return (
            <div style={{ width: "80%", height: "650px", boxSizing: "border-box", paddingTop: "10px", margin: "0 auto" }} className="row">
                <button className="btn btn-primary" style={{ marginBottom: "10px" }} onClick={this.manipulateAddUser}>Add User</button>
                <div className="ag-theme-balham col-lg-12" style={divStyle}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.users}
                        rowHeight={38}
                        onGridReady={this.onGridReady.bind(this)}
                        enableSorting
                        enableFilter
                        enableColResize
                        pagination={true}
                        paginationPageSize={15}
                        animateRows={true}
                        defaultColDef={this.state.defaultColDef}>
                    </AgGridReact>
                </div>
                {adder}
                {editor}
            </div>
        );
    }
}