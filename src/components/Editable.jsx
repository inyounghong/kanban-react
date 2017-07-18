import React, { PropTypes } from 'react';

export default class Editable extends React.Component {
    constructor() {
        super();
        this.state = {
            isEditing: false,
        }
        this.setIsEditing = this.setIsEditing.bind(this);
        this.handleFinishEdit = this.handleFinishEdit.bind(this);
        this.selectToEnd = this.selectToEnd.bind(this);
    }

    setIsEditing() {
        this.setState({isEditing: true});
    }

    handleFinishEdit(e) {
        if((e.type === 'keypress') && (e.key !== 'Enter')) {
            return;
        }
        const value = e.target.value;
        if(this.props.onEdit && value.trim().length) {
            this.props.onEdit(this.props.id, value);
        }
    }

  selectToEnd(input) {
    if(input) {
      input.selectionEnd = this.props.value.length;
    }
  }

  renderEdit() {
    return (
        <textarea
          autoFocus
          className="editing"
          ref={this.selectToEnd}
          onBlur={this.handleFinishEdit}
          onKeyPress={this.handleFinishEdit}
        >
            {this.props.value}
        </textarea>
    );
  }


  renderValue() {
    return (
        <span>
            <div onClick={this.setIsEditing}>{this.props.value}</div>
        </span>
    );
  }

    render() {
        if(this.state.isEditing) {
            return this.renderEdit();
        }
        return this.renderValue();
    }
}

Editable.propTypes = {
  editing: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onValueClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
