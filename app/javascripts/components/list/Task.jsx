import React, { PropTypes } from 'react';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
        }
        this.setIsEditing = this.setIsEditing.bind(this);
        this.renderDefault = this.renderDefault.bind(this);
        this.renderEditing = this.renderEditing.bind(this);
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

    render() {
        const connectDragSource = this.props.connectDragSource;
        const connectDropTarget = this.props.connectDropTarget;
        const isDragging = this.props.isDragging;

        var classes = 'task' + (this.state.isComplete ? ' complete' : '');

        return connectDragSource(
            connectDropTarget(
                <div className={classes} style={{opacity: isDragging ? 0 : 1 }}>
                    {this.state.isEditing ? this.renderEditing() : this.renderDefault()}
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
