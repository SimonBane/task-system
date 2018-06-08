import React, { Component } from 'react';
import { SkyLightStateless } from 'react-skylight';

class AddTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task: {
                user: "",
                title: "",
                description: "",
                priority: "",
                status: ""
            },
            tasks: null
        }
    }

    onChangeHandler = (event, field) => {
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

        let updatedTask = this.state.task;
        updatedTask[field] = event.target.value;
        updatedTask.user = loggedUser.username;

        this.setState({ task: updatedTask });
    }

    addTask = () => {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(this.state.task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        this.setState({tasks: tasks});
        this.updateTaskTableHandler();
        this.props.close();
    }

    updateTaskTableHandler = () => {
        const tasks = this.state.tasks;
        this.props.tasksUpdate(tasks);
    }

    render() {
        return (
            <div>
                <SkyLightStateless
                    isVisible={this.props.show}
                    onCloseClicked={this.props.close}
                    title="Add a task"
                >
                    <form className="Form">
                        <input type="text" placeholder="Title" onChange={(event) => this.onChangeHandler(event, "title")} />
                        <input type="text" placeholder="Description" onChange={(event) => this.onChangeHandler(event, "description")} />
                        <input type="text" placeholder="Priority" onChange={(event) => this.onChangeHandler(event, "priority")} />
                        <input type="text" placeholder="Status" onChange={(event) => this.onChangeHandler(event, "status")} />
                        <button onClick={this.addTask} className="btn btn-primary" >Add</button>
                    </form>
                </SkyLightStateless>
            </div>
        )
    }
}

AddTask.displayName = 'AddTask';

export default AddTask;
