import React, { PropTypes } from 'react';

export default class Tags extends React.Component {
    constructor() {
        super();
        this.handleAddTag = this.handleAddTag.bind(this);
        this.displayTagList = this.displayTagList.bind(this);
    }

    displayTagList() {

    }

    handleAddTag() {
        // const tags = this.props.tags;
        // tags.push("New Tag");
        // this.props.setTags(tags);
    }

    render() {
        const tags = this.props.tags.map(tag => (
            <div className="tag">{tag}</div>
        ));

        return (
            <div className="tag-wrap">
                {tags}
                <div className="add-tag"
                    onClick={this.displayTagList}>+</div>
            </div>
        )
    }

}
