import React, { PropTypes } from 'react';
import Task from '../../containers/Task.jsx';
import Column from '../../containers/Column.jsx';

export default class Story extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleAddTask = this.handleAddTask.bind(this);
    }
    handleAddTask() {
        this.props.addTask(this.props.story.id);
    }

    render() {
        const tasksTodo     = this.props.tasks.filter(task => task.status === 0);
        const tasksTesting  = this.props.tasks.filter(task => task.status === 1);
        const tasksDone     = this.props.tasks.filter(task => task.status === 2);

        return (
            <div className="story">
                <span className="story-name">{this.props.story.name}</span>
                <span className="add-button"
                    onClick={this.handleAddTask}>(+)</span>
                <span className="task-count">{this.props.tasks.length} Tasks</span>

                <div className="row">
                    <Column name="Todo"
                        tasks={tasksTodo}
                        key={this.props.story.id + "_0"}
                        id={this.props.story.id + "_0"}
                    />
                    <Column name="Testing"
                        tasks={tasksTesting}
                        key={this.props.story.id + "_1"}
                        id={this.props.story.id + "_1"}
                    />
                    <Column name="Done"
                        tasks={tasksDone}
                        key={this.props.story.id + "_2"}
                        id={this.props.story.id + "_2"}
                    />
                </div>
                {/* <div className="list-task-wrap">
                    {tasks}
                </div> */}
            </div>
        );
    }
}
