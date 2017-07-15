import React, { PropTypes } from 'react';

export default class Editable extends React.Component {
  constructor() {
    super();
    this.handleValueClick = this.handleValueClick.bind(this);
    this.handleFinishEdit = this.handleFinishEdit.bind(this);
    this.selectToEnd = this.selectToEnd.bind(this);
  }

  handleValueClick() {
    this.props.onValueClick(this.props.id);
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
            <div onClick={this.handleValueClick}>{this.props.value}</div>
        </span>
    );
  }

  render() {
    if(this.props.editing) {
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
