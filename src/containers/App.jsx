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
        this.handleAddStory = this.handleAddStory.bind(this);
        this.setEditingNote = this.setEditingNote.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.handleToggleView = this.handleToggleView.bind(this);
    }

    handleToggleView() {
        this.props.handleToggleView(!this.props.app.isColumnView);
    }

    setEditingNote(noteId) {
        setState({editingNote: noteId});
    }

    handleDeleteTask(taskId) {
        this.props.deleteTask(this.props.selectedNote, taskId);
    }

    handleAddStory() {
        console.log("add story");
    }

    render() {
        const columnClass = (this.props.app.isColumnView) ? "tab active" : "tab";
        const storyClass = (!this.props.app.isColumnView) ? "tab active" : "tab";

        return (

            <div className="container">
                <div className="tab-wrap">
                    <div
                        className={columnClass}
                        onClick={this.handleToggleView}>
                        <i className="fa fa-columns"></i> Column View
                    </div>
                    <div className={storyClass}
                        onClick={this.handleToggleView}>
                        <i className="fa fa-align-justify"></i> Story View
                    </div>
                </div>

                <List
                    stories={this.props.stories}
                    tasks={this.props.tasks}
                />
                <div className="add-story"
                     onClick={this.addStory} >
                     <i className="fa fa-fw fa-plus"></i> Add Story
                 </div>
                 <br/><br/>
                 <div className="reset-store" onClick={this.props.onReset}>
                     Reset persisted store
                 </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => (state);

const mapDispatchToProps = (dispatch) => ({
    // handle View
    handleToggleView(isColumnView) {
        dispatch(appActions.setIsColumnView(isColumnView));
    }

});

export default DragDropContext(HTML5Backend)(
    connect(mapStateToProps, mapDispatchToProps)(App)
);
