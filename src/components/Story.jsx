import React, { PropTypes } from 'react';
import Task from '../containers/Task.jsx';
import Column from '../containers/Column.jsx';
import Editable from './Editable';
import * as itemTypes from '../constants/itemTypes';

export default class Story extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
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

    render() {
        const allTasks = this.props.tasks;
        const storyId = this.props.story.id;
        const columnNames = ["Todo", "Testing", "Done"];

        // Generate three columns
        const columns = columnNames.map(function(name, i) {
            const tasks = allTasks.filter(task => task.status === i);
            return (
                <Column name={name}
                    tasks={tasks}
                    key={storyId + "_" + i}
                    id={storyId + "_" + i}
                />
            )}
        );

        return (
            <div className="story">
                <Editable
                    value={this.props.story.name}
                    type={itemTypes.STORY}
                    onEdit={this.handleUpdate}
                />
                <span className="add-button"
                    onClick={this.handleAddTask}>(+)</span>
                <span className="task-count">{this.props.tasks.length} Tasks</span>

                <div className="row">
                    {columns}
                </div>
            </div>
        );
    }
}
