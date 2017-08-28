import React, { PropTypes } from 'react';
import * as itemTypes from '../constants/itemTypes';

export default class Editable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            text: props.value,
        }
        this.setIsEditing = this.setIsEditing.bind(this);
        this.handleFinishEdit = this.handleFinishEdit.bind(this);
        this.selectToEnd = this.selectToEnd.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    setIsEditing() {
        this.setState({isEditing: true});
    }
    handleChange(e) {
        this.setState({text: e.target.value});
    }

    handleFinishEdit(e) {
        if((e.type === 'keypress') && (e.key !== 'Enter')) {
            return;
        }
        this.setState({isEditing: false});
        if(this.props.onEdit && this.state.text.length) {
            this.props.onEdit(this.state.text);
        }
    }

    selectToEnd(input) {
        if(input) {
            input.selectionEnd = this.props.value.length;
        }
    }

    renderEdit() {
        if (this.props.type === itemTypes.TASK) {
            return (
                <textarea
                    autoFocus
                    className="editing"
                    ref={this.selectToEnd}
                    onBlur={this.handleFinishEdit}
                    onKeyPress={this.handleFinishEdit}
                    onChange={this.handleChange}
                    >
                    {this.state.text}
                </textarea>
            );
        } else if (this.props.type === itemTypes.STORY) {
            return (
                <input
                    type="text"
                    autoFocus
                    className="editing"
                    ref={this.selectToEnd}
                    onBlur={this.handleFinishEdit}
                    onKeyPress={this.handleFinishEdit}
                    onChange={this.handleChange}
                    value={this.state.text}
                />
            )
        }

    }

    renderDefault() {
        const className = (this.props.type === itemTypes.STORY) ? "story-name" : "";
        return (
            <div
                onClick={this.setIsEditing}
                className={className}
                >
                {this.props.value}
            </div>
        );
    }

    render() {
        if(this.state.isEditing) {
            return this.renderEdit();
        }
        return this.renderDefault();
    }
}
