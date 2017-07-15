import React, { PropTypes } from 'react';

export default class Task extends React.Component {
    constructor() {
        super();
        // this.handleAddTag = this.handleAddTag.bind(this);
        // this.displayTagList = this.displayTagList.bind(this);
    }

    render() {
        return (
            <div className="task">
                <label>
                    <input type="checkbox" /> {this.props.task.text}
                </label>
            </div>
        )
    }

}
