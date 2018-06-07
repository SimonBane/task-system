import React, { Component } from "react";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

export default class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            gridOptions: {
                context: {
                    componentParent: this
                }
            },
            columnDefs: [
                {
                    headerName: "Username",
                    field: "username",
                    width: 80
                },
                {
                    headerName: "Email",
                    field: "email",
                    width: 80
                },
                {
                    headerName: "Role",
                    field: "role",
                    width: 80
                }
            ],
            onGridReady: function (params) {
                params.api.sizeColumnsToFit();
            },
            defaultColDef: { editable: false }
        }
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

    render() {
        const divStyle = {
            boxSizing: "border-box",
            height: "100%",
            width: "100%"
        }

        return (
            <div style={{ width: "100%", height: "650px", boxSizing: "border-box", paddingTop: "10px" }} className="row">
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
            </div>
        );
    }
}