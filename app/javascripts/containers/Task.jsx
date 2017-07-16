import Task from '../components/list/Task.jsx';
import appActions from '../actions/app';
import tasksActions from '../actions/tasks';
import notesActions from '../actions/notes';
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import * as itemTypes from '../constants/itemTypes';
import { connect } from 'react-redux';

const taskSource = {
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

const taskTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;
    if(sourceId !== targetId) {
      targetProps.onMoveListTask(sourceId, targetId);
    }
  },
};

const mapStateToProps = (state) => ({
    // selectedNote: state.app,
});
const mapDispatchToProps = (dispatch) => ({
    onMoveListTask(sourceId, targetId) {
        dispatch(tasksActions.moveTask(sourceId, targetId));
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
    DragSource(itemTypes.TASK, taskSource, collectDragSource)(
    DropTarget(itemTypes.TASK, taskTarget, collectDropTarget)(Task)
));
