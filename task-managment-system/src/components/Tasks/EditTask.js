import React, { Component } from 'react';
import { SkyLightStateless } from 'react-skylight';

export default class EditTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task: this.props.task
        }
    }

    onChangeHandler = (event, field) => {
        const tsk = this.state.task;
        tsk[field] = event.target.value;

        this.setState({
            task: tsk
        });
    }

    editTaskInformationHandler = () => {
        const updatedTask = this.state.task;

        let storedTasks = JSON.parse(localStorage.getItem('tasks'));
        let taskIndex = 0;
        for (let task of storedTasks) {
          if (task.title === updatedTask.title) {
            break;
          }
          taskIndex++;
        }
        storedTasks[taskIndex] = updatedTask;
        localStorage.setItem('tasks', JSON.stringify(storedTasks));

        this.updateTaskInformationHandler();
        this.props.close();
    }

    updateTaskInformationHandler = () => {
        const task = this.state.task;
        this.props.taskUpdate(task);
    }

    render() {
        return (
            <div>
                <SkyLightStateless
                    isVisible={this.props.show}
                    onCloseClicked={this.props.close}
                    title="Edit Task"
                >
                    <form className="Form">
                        <input type="text" placeholder="Description" onChange={(event) => this.onChangeHandler(event, "description")} value={this.state.task.description}/>
                        <input type="text" placeholder="Priority" onChange={(event) => this.onChangeHandler(event, "priority")} value={this.state.task.priority}/>
                        <input type="text" placeholder="Status" onChange={(event) => this.onChangeHandler(event, "status")} value={this.state.task.status} />
                        <button onClick={this.editTaskInformationHandler} className="btn btn-primary" >Edit</button>
                    </form>
                </SkyLightStateless>
            </div>
        )
    }
}