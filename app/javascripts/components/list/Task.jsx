import React, { PropTypes } from 'react';

export default class Task extends React.Component {
    constructor() {
        super();
        this.state = {
            isComplete: false,
        }
        // this.toggleComplete = this.toggleComplete.bind(this);
    }

    render() {
        const connectDragSource = this.props.connectDragSource;
        const connectDropTarget = this.props.connectDropTarget;
        const isDragging = this.props.isDragging;

        var classes = 'task' + (this.state.isComplete ? ' complete' : '');

        return connectDragSource(
            connectDropTarget(
                <div className={classes} style={{opacity: isDragging ? 0 : 1 }}>
                    {this.props.id}
                    {this.props.task.text}
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
