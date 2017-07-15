import React, { PropTypes } from 'react';
import Tags from './Tags.jsx';
import appActions from '../actions/app';

export default class Note extends React.Component {
    constructor() {
        super();
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
        this.handleSetTags = this.handleSetTags.bind(this);
        this.selectNote = this.selectNote.bind(this);
    }
    selectNote() {
        this.props.selectNote(this.props.id);
    }
    handleDeleteNote() {
        this.props.onDelete(this.props.id);
    }

    handleSetTags(newTags) {
        var newNote = this.props.note;
        newNote.tags = newTags;
        this.props.editNote(newNote);
    }

  render() {
    const connectDragSource = this.props.connectDragSource;
    const connectDropTarget = this.props.connectDropTarget;
    const isDragging = this.props.isDragging;

    return connectDragSource(
      connectDropTarget(
        <li style={{ opacity: isDragging ? 0 : 1 }} className="note" onClick={this.selectNote}>
          {this.props.children}
          <Tags
            tags={this.props.note.tags}
            allTags={this.props.allTags}
            setTags={this.handleSetTags}
            />
          <span onClick={this.handleDeleteNote}>DeleteMe</span>
        </li>
      )
    );
  }
}

Note.propTypes = {
  children: PropTypes.node,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool,
};
