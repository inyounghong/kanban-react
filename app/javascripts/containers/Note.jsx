import Note from '../components/Note.jsx';
import appActions from '../actions/app';
import tasksActions from '../actions/tasks';
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import * as itemTypes from '../constants/itemTypes';
import { connect } from 'react-redux';

const noteSource = {
    beginDrag(props) {
        const item = {
            id: props.id,
        };
        return item;
    },
    isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
    },
};

const noteTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(sourceId !== targetId) {
      targetProps.onMoveNote(sourceId, targetId);
    }
  },
};

const mapStateToProps = (state) => ({
    selectedNote: state.app,
});
const mapDispatchToProps = (dispatch) => ({
    selectNote(noteId) {
        dispatch(appActions.selectNote(noteId));
    },
});

const collectDragSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const collectDropTarget = (connect) => ({
  connectDropTarget: connect.dropTarget(),
});


export default connect(mapStateToProps, mapDispatchToProps)(
    DragSource(itemTypes.NOTE, noteSource, collectDragSource)(
  DropTarget(itemTypes.NOTE, noteTarget, collectDropTarget)(Note)
));
