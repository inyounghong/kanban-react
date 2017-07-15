import React, { PropTypes } from 'react';

import lanesActions from '../actions/lanes';
import tasksActions from '../actions/tasks';
import appActions from '../actions/app';
import notesActions from '../actions/notes';
import { connect } from 'react-redux';
import Lanes from '../components/Lanes.jsx';
import Sidebar from '../components/Sidebar.jsx';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            editingNote: null,
        }
        this.addTagToNote = this.addTagToNote.bind(this);
        this.setEditingNote = this.setEditingNote.bind(this);
    }
    addTagToNote() {
        console.log("adding tag to note");
    }
    setEditingNote(noteId) {
        setState({editingNote: noteId});
    }
    renderTagDisplay() {
        const tags = this.props.tags.map(tag => (
            <div className="tag">{tag.name}</div>
        ));
        return (
            <div className="tag-display">
                {tags.length > 0 ? tags : "No tags"}
            </div>
        )
    }
    renderTagList() {
        const tags = this.props.tags.map(tag => (
            <li onClick={this.addTagToNote}>{tag.name}</li>
        ))
        return (
            <ul className="tag-list">
                {tags}
            </ul>
        )
    }

  render() {
      console.log(this.props);

      const selectedNote = this.props.notes.find(note => {
          return note.id === this.props.selectedNote;
      });
      const selectedNoteTasks = selectedNote.tasks.map(taskId =>
          this.props.tasks.find(task => task.id === taskId));

    return (
      <div className="react-kanban">
        <div className="kanban">
            <h1 className="app-title">React.js Kanban</h1>
            <button
              className="add-lane"
              onClick={this.props.onCreateLane}
            >
              + Lane
            </button>
            <button
              className="reset-store"
              onClick={this.props.onReset}
            >
              Reset persisted store
            </button>
            <Lanes
              lanes={this.props.lanes}
              onEditLane={this.props.onEditLane}
              onDeleteLane={this.props.onDeleteLane}
              onMoveLane={this.props.onMoveLane}
              selectNote={this.selectNote}
            />
            {this.renderTagDisplay()}
            {this.renderTagList()}
        </div>
        <Sidebar
            selectedNote={selectedNote}
            tasks={selectedNoteTasks}
            addTask={this.props.addTask}
        />
      </div>
    );
  }
}

App.propTypes = {
  lanes: PropTypes.array.isRequired,
  onCreateLane: PropTypes.func.isRequired,
  onDeleteLane: PropTypes.func.isRequired,
  onEditLane: PropTypes.func.isRequired,
  onMoveLane: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lanes: state.lanes,
  tags: state.tags,
  notes: state.notes,
  selectedNote: state.app,
  tasks: state.tasks
});

const mapDispatchToProps = (dispatch) => ({
    addTask(noteId, taskText) {
      const newTask = tasksActions.createTask(taskText);
      dispatch(newTask);
      dispatch(notesActions.addTaskToNote(noteId, newTask.payload.id));
    },

  onCreateLane() {
    dispatch(lanesActions.createLane('Active'));
  },

  onEditLane(laneId, name) {
    const updatedLane = {
      id: laneId,
    };

    if(name) {
      updatedLane.name = name;
      updatedLane.editing = false;
    } else {
      updatedLane.editing = true;
    }

    dispatch(lanesActions.updateLane(updatedLane));
  },

  onDeleteLane(laneId) {
    dispatch(lanesActions.deleteLane(laneId));
  },

  onMoveLane(sourceId, targetId) {
    dispatch(lanesActions.move('lane', sourceId, targetId));
  },
});

export default DragDropContext(HTML5Backend)(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
