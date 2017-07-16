import React, { PropTypes } from 'react';
import Task from '../../containers/Task.jsx';

export default class Story extends React.Component {

    render() {
        const tasks = this.props.tasks.map(task => {
            return (
                <Task
                    id={task.id}
                    task={task}
                    key={task.id}
                />
            )
        })

        return (
            <div className="story">
                <span className="story-name">{this.props.note.text}</span>
                <span className="task-count">{this.props.tasks.length} Tasks</span>

                <div className="list-task-wrap">
                    {tasks}
                </div>
            </div>
        );
    }
}
