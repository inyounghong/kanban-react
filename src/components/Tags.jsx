import React, { PropTypes } from 'react';

export default class Tags extends React.Component {
    constructor() {
        super();
        // this.handleAddTag = this.handleAddTag.bind(this);
        // this.displayTagList = this.displayTagList.bind(this);
    }


    render() {
        const statusList = [
            null,
            {
                name: "Todo",
                color: "blue",
            },
            {
                name: "Testing",
                color: "yellow",
            },
            {
                name: "done",
                color: "green",
            },
        ]

        const tags = this.props.tags.map(tag => (
            <div className="tag"
                style={{background: statusList[tag].color}}>
                {statusList[tag].name}
            </div>
        ));

        return (
            <div className="tag-wrap">
                {tags}
            </div>
        )
    }

}
