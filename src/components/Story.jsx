import React, { PropTypes } from 'react';
import Task from '../containers/Task.jsx';
import Column from '../containers/Column.jsx';
import Editable from './Editable';
import * as itemTypes from '../constants/itemTypes';
import * as columnTypes from '../constants/columnTypes';

export default class Story extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
        }
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.renderColumns = this.renderColumns.bind(this);
        this.renderTasks = this.renderTasks.bind(this);
        this.toggleIsOpen = this.toggleIsOpen.bind(this);
    }

    toggleIsOpen() {
        this.setState({isOpen: !this.state.isOpen});
    }

    handleAddTask() {
        this.props.addTask(this.props.story.id);
    }

    handleUpdate(text) {
        const updatedStory = {
            ...this.props.story,
            name: text,
        }
        this.props.updateStory(updatedStory);
    }

    renderColumns() {
        const storyTasks = this.props.tasks;
        const storyId = this.props.story.id;
        const columnInfo = [
            {name: "Todo", id: columnTypes.TODO},
            {name: "Testing", id: columnTypes.TESTING},
            {name: "Complete", id: columnTypes.COMPLETE},
        ];

        // Generate three columns
        const columns = columnInfo.map(function(col) {
            const tasks = storyTasks.filter(task => task.status === col.id);
            return (
                <Column name={name}
                    tasks={tasks}
                    key={storyId + "_" + col.id}
                    id={storyId + "_" + col.id}
                />
            )}
        );

        return (
            <div className="row">
                {columns}
            </div>
        )
    }

    renderTasks() {
        const storyTasks = this.props.tasks;
        const storyId = this.props.story.id;

        return (
            <Column name={null}
                tasks={storyTasks}
                key={storyId + "_" + columnTypes.NONE}
                id={storyId + "_" + columnTypes.NONE}
            />
        );
    }

    render() {
        const arrowClass = "fa fa-fw fa-chevron-" + (this.state.isOpen ? "down" : "right");
        return (
            <div className="story">
                <i className={arrowClass}
                    onClick={this.toggleIsOpen}></i>
                <Editable
                    value={this.props.story.name}
                    type={itemTypes.STORY}
                    onEdit={this.handleUpdate}
                />
                <span className="task-count">{this.props.tasks.length} Tasks</span>
                <span className="add-button"
                    onClick={this.handleAddTask}>
                    <i className="fa fa-fw fa-plus"></i>Add Task
                </span>

                <div className="column-container" style={{display: this.state.isOpen ? 'block' : 'none'}}>
                    {this.props.isColumnView ? this.renderColumns() : this.renderTasks()}
                </div>
            </div>
        );
    }
}
