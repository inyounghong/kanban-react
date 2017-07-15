import React, { PropTypes } from 'react';
import Note from '../containers/Note.jsx';
import Editable from './Editable.jsx';

export default class Notes extends React.Component {

  render() {
    const notes = this.props.notes.map(note => (
      <Note
        id={note.id}
        key={note.id}
        note={note}
        onMoveNote={this.props.onMoveNote}
        value={note.text}
        onDelete={this.props.onDeleteNote}
        onEdit={this.props.onEditNote}
        editNote={this.props.editNote}
      >
        <Editable
          editing={note.editing}
          id={note.id}
          value={note.text}
          onEdit={this.props.onEditNote}
          onValueClick={this.props.onValueClick}
        />
      </Note>
    ));

    return (
      <ul className="notes-list">
        {notes}
      </ul>
    );
  }
}

Notes.propTypes = {
  notes: PropTypes.array.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  onEditNote: PropTypes.func.isRequired,
  onMoveNote: PropTypes.func.isRequired,
  onValueClick: PropTypes.func.isRequired,
  onSetTags: PropTypes.func.isRequired,
};
