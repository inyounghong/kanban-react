import React, { PropTypes } from 'react';
import tasksActions from '../redux/actions/tasks';
import appActions from '../redux/actions/app';
import storyActions from '../redux/actions/stories';
import { connect } from 'react-redux';
import List from '../components/List.jsx';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class App extends React.Component {

    constructor() {
        super();
        this.addTagToNote = this.addTagToNote.bind(this);
        this.setEditingNote = this.setEditingNote.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.handleToggleView = this.handleToggleView.bind(this);
    }
    handleToggleView() {
        this.props.handleToggleView(!this.props.app.isColumnView);
    }
    addTagToNote() {
        console.log("adding tag to note");
    }
    setEditingNote(noteId) {
        setState({editingNote: noteId});
    }
    handleDeleteTask(taskId) {
        // this.setState({editingNote: null});
        this.props.deleteTask(this.props.selectedNote, taskId);
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
        return (
            <div className="kanban">
                <h1 className="app-title">React.js Kanban</h1>

                <div className="container">
                    <div className="tab-wrap">
                        <div
                            className="tab"
                            style={{background: (this.props.app.isColumnView) ? "#ddd" : "none"}}
                            onClick={this.handleToggleView}>
                            <i className="fa fa-columns"></i> Column View
                        </div>
                        <div className="tab"
                            style={{background: (!this.props.app.isColumnView) ? "#ddd" : "none"}}
                            onClick={this.handleToggleView}>
                            <i className="fa fa-align-justify"></i> Story View
                        </div>
                    </div>

                    <div
                        className="reset-store"
                        onClick={this.props.onReset} >
                        Reset persisted store
                    </div>
                    <List
                        stories={this.props.stories}
                        tasks={this.props.tasks}
                    />
                </div>

            </div>
        );
        }
    }


const mapStateToProps = (state) => (state);

//{
//     tags: state.tags,
//     tasks: state.tasks,
//     stories: state.stories,
// }

const mapDispatchToProps = (dispatch) => ({

    // handle View
    handleToggleView(isColumnView) {
        dispatch(appActions.setIsColumnView(isColumnView));
    }

});

export default DragDropContext(HTML5Backend)(
    connect(mapStateToProps, mapDispatchToProps)(App)
);
