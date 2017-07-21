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
                color: "#2caeff",
            },
            {
                name: "Testing",
                color: "#ff9d00",
            },
            {
                name: "Done",
                color: "#57dc39",
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
