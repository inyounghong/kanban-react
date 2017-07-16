import React, { PropTypes } from 'react';

export default class Task extends React.Component {
    constructor() {
        super();
        this.state = {
            isComplete: false,
        }
        this.toggleComplete = this.toggleComplete.bind(this);
    }

    toggleComplete() {
        this.setState({isComplete: !this.state.isComplete})
    }

    render() {
        const connectDragSource = this.props.connectDragSource;
        const connectDropTarget = this.props.connectDropTarget;
        const isDragging = this.props.isDragging;

        var classes = 'list-task' + (this.state.isComplete ? ' complete' : '');

        return connectDragSource(
            connectDropTarget(
                <div className={classes} style={{opacity: isDragging ? 0 : 1 }}>
                    <label>
                        <input type="checkbox"
                        onClick={this.toggleComplete}/> {this.props.task.text}
                    </label>
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
