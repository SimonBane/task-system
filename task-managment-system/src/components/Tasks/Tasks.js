import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import AddTask from './AddTask';
import EditTask from './EditTask';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

export default class Tasks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            showAdd: false,
            showEdit: false,
            currentTask: {},
            gridOptions: {
                context: {
                    componentParent: this
                }
            },
            columnDefs: [
                {
                    headerName: "User",
                    field: "user",
                    width: 80
                },
                {
                    headerName: "Title",
                    field: "title",
                    width: 80
                },
                {
                    headerName: "Description",
                    field: "description",
                    width: 80
                },
                {
                    headerName: "Priority",
                    field: "priority",
                    width: 80
                },
                {
                    headerName: "Status",
                    field: "status",
                    width: 80
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
        eSpan.addEventListener('click', () => this.editTask(props));
        return eSpan;
    }

    deleteRow = (props) => {
        let storedTasks = JSON.parse(localStorage.getItem('tasks'));
        let taskIndex = 0;
        for (let _task of storedTasks) {
            if (_task.user === props.data.user && _task.title === props.data.title) {
                break;
            }
            taskIndex++;
        }
        storedTasks.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
        this.setState({ tasks: storedTasks });
    }

    editTask = (props) => {
        this.setState({
            currentTask: {
                user: props.data.user,
                title: props.data.title,
                description: props.data.description,
                priority: props.data.priority,
                status: props.data.status
            },
            showEdit: true
        });
    }

    componentDidMount() {
        let storedTasks = JSON.parse(localStorage.getItem('tasks'));
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

        if (loggedUser.role === 'admin') {
            this.setState({ tasks: storedTasks });
        } else {
            let filterTasks = [];
            Object.keys(storedTasks).forEach(function (key) {
                if (storedTasks[key].user === loggedUser.username) {
                    filterTasks.push(storedTasks[key]);
                }
            });
            this.setState({ tasks: filterTasks });
        }
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    manipulateAddTask = () => {
        this.setState({ showAdd: !this.state.showAdd });
    }

    updateTasks = (editedTask) => {
        this.setState({currentTask: editedTask});
        const rowNode = this.gridApi.getRowNode(editedTask.title);
        var a = this.state.currentTask;
        rowNode.setDataValue("title", this.state.currentTask.title);
        rowNode.setDataValue("description", this.state.currentTask.description);
        rowNode.setDataValue("priority", this.state.currentTask.priority);
        rowNode.setDataValue("status", this.state.currentUser.status);
    }

    manipulateEditTask = () => {
        this.setState({ showEdit: !this.state.showEdit });
    }

    render() {
        const divStyle = {
            boxSizing: "border-box",
            height: "100%",
            width: "100%"
        }

        const adder = this.state.showAdd
            ? <AddTask show={this.state.showAdd} close={() => this.manipulateAddTask()} tasksUpdate={this.updateTasks} />
            : null;

        const editor = this.state.showEdit
            ? <EditTask
                show={this.state.showEdit}
                close={() => this.manipulateEditTask()}
                task={this.state.currentTask}
                taskUpdate={this.updateTasks} />
            : null;

        return (
            <div style={{ width: "80%", height: "650px", boxSizing: "border-box", paddingTop: "10px", margin: "0 auto" }} className="row">
                <button className="btn btn-primary" style={{ marginBottom: "10px" }} onClick={this.manipulateAddTask}>Add Task</button>
                <div className="ag-theme-balham col-lg-12" style={divStyle}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.tasks}
                        rowHeight={38}
                        onGridReady={this.onGridReady.bind(this)}
                        enableSorting
                        enableFilter
                        enableColResize
                        pagination={true}
                        paginationPageSize={15}
                        animateRows={true}
                        defaultColDef={this.state.defaultColDef}
                        rowSelection='single'>
                    </AgGridReact>
                </div>
                {adder}
                {editor}
            </div>
        );
    }
}