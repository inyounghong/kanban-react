import React, { PropTypes } from 'react';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            text: this.props.task.text,
        }
        this.setToEditing = this.setToEditing.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    setToEditing() {
        this.setState({isEditing: true})
    }
    handleChange(e) {
        this.setState({text: e.target.value})
    }
    handleUpdate() {
        const newText = this.state.text.trim();
        if (newText != "") {
            this.props.onUpdateTask({
                id: this.props.task.id,
                text: newText,
            });
        }
        this.setState({isEditing: false});
    }
    handleDelete() {
        this.props.onDeleteTask(this.props.task.id);
    }
    renderEditing() {
        return (
            <div>
                <textarea type="text"
                className="text-edit"
                autoFocus
                value={this.state.text}
                onChange={this.handleChange}
                onBlur={this.handleUpdate}
                >
                </textarea>

            </div>

        )
    }
    render() {
        return (
            <div className="task">
                <label>
                    <input type="checkbox" />
                    {this.state.isEditing ? this.renderEditing() : this.props.task.text}
                </label>
                <span onClick={this.setToEditing}>(Edit)</span>
                <span onClick={this.handleDelete}>(X)</span>
            </div>
        )
    }

}
