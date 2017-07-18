import React, { PropTypes } from 'react';
import Editable from './Editable';
import * as itemTypes from '../constants/itemTypes';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            showEditMenu: false,
        }
        this.setIsEditing = this.setIsEditing.bind(this);
        this.renderDefault = this.renderDefault.bind(this);
        this.renderEditing = this.renderEditing.bind(this);
        this.renderEditMenu = this.renderEditMenu.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.generateClasses = this.generateClasses.bind(this);
        this.toggleEditMenu = this.toggleEditMenu.bind(this);
    }
    handleUpdate(text) {
        const updatedTask = {
            id: this.props.task.id,
            text: text,
        }
        this.props.updateTask(updatedTask);
    }
    handleDelete() {
        this.props.deleteTask(this.props.task.id, this.props.storyId);
    }
    setIsEditing() {
        this.setState({isEditing: true});
    }
    renderDefault() {
        return (
            <div>
                <div onClick={this.setIsEditing}>
                    {this.props.task.text}
                </div>
                {/* <span onClick={this.setIsEditing}>Edit</span> */}
            </div>
        )
    }
    renderEditing() {
        return (
            <textarea
                >
                {this.props.task.text}
            </textarea>
        )
    }
    generateClasses(isDragging) {
        var classes = 'task';
        classes += (isDragging ? ' dragging' : '');
        return classes;
    }
    toggleEditMenu() {
        this.setState({showEditMenu: !this.state.showEditMenu})
    }
    renderEditMenu() {
        return (
            <div className="editMenu">
                <div onClick={this.handleDelete}>
                    Delete
                </div>
            </div>
        )
    }

    render() {
        const connectDragSource = this.props.connectDragSource;
        const connectDropTarget = this.props.connectDropTarget;
        const isDragging = this.props.isDragging;

        return connectDragSource(
            connectDropTarget(
                <div className={this.generateClasses(isDragging)} >
                    <Editable
                        value={this.props.task.text}
                        type={itemTypes.TASK}
                        onEdit={this.handleUpdate}
                    />
                    <div onClick={this.toggleEditMenu}>(Edit)</div>
                    { this.state.showEditMenu ? this.renderEditMenu() : null}
                </div>
            )
        );
    }
}

Task.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool,
};
