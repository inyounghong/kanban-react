import React, { PropTypes } from 'react';
import Task from '../components/Task.jsx';


export default class Sidebar extends React.Component {

    constructor() {
        super();
        this.state = {
            isEditing: false,
        }
        this.handleAddTask = this.handleAddTask.bind(this);
        this.setToEditing = this.setToEditing.bind(this);
    }
    setToEditing() {
        this.setState({isEditing: true});
    }
    handleAddTask() {
        this.props.addTask(this.props.selectedNote.id, "NEw Task Text");
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
    renderEditing() {
        return (
            <input type="text"
                autoFocus/>
        )
    }
    renderWithSelectedNote() {
        const tasks = this.props.tasks.map(task => (
            <Task task={task} />
        ));

        return (
            <div className="sidebar">
                {this.renderSelectedNote()}

                <h2>Tasks</h2>
                {tasks}
                <div onClick={this.setToEditing}>
                    {this.state.isEditing ? this.renderEditing() : "Add a Task"}
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
