import React, { PropTypes } from 'react';
import Task from '../components/Task.jsx';


export default class Sidebar extends React.Component {

    constructor() {
        super();
        this.state = {
        }
        this.handleAddTask = this.handleAddTask.bind(this);
    }
    setToEditing() {
        this.setState({isEditing: true});
    }
    handleAddTask() {
        this.props.addTask(this.props.selectedNote.id, "New Task");
    }

    renderSelectedNote() {
        return (
            <div className="note-title">
                {this.props.selectedNote.text}
            </div>
        )
    }
    renderDefault() {
        return (
            <div className="sidebar">
                No Note selected
            </div>
        )
    }
    renderWithSelectedNote() {
        const tasks = this.props.tasks.map(task => (
            <Task task={task}
                onUpdateTask={this.props.updateTask}
                onDeleteTask={this.props.deleteTask}
            />
        ));

        return (
            <div className="sidebar">
                {this.renderSelectedNote()}

                <h2>Tasks</h2>
                {tasks}
                <div onClick={this.handleAddTask}>
                    "Add a task"
                </div>
            </div>
        )
    }
    render() {
        return (
            this.props.selectedNote ? this.renderWithSelectedNote() : this.renderDefault()
        )
    }
}
