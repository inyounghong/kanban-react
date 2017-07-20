import Task from '../components/Task.jsx';
import tasksActions from '../redux/actions/tasks';
import storyActions from '../redux/actions/stories';
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import * as itemTypes from '../constants/itemTypes';
import { connect } from 'react-redux';
import { handleHover } from '../helpers'

const taskSource = {
    beginDrag(props) {
        const item = {
            id: props.id,
            isColumnView: props.isColumnView
            // handleMove: props.handleMove,
        };
        return item;
    },
    isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
    },
};

const taskTarget = {
    hover(targetProps, monitor) {
        handleHover(targetProps, monitor.getItem(), itemTypes.TASK);
    },
};

const mapStateToProps = (state) => ({
    // selectedNote: state.app,
    allStories: state.stories,
    allTasks: state.tasks,
    isColumnView: state.app.isColumnView,
});
const mapDispatchToProps = (dispatch) => ({
    moveTask(source, target) {
        dispatch(tasksActions.moveTask(source, target));
    },
    updateTask(task) {
        dispatch(tasksActions.updateTask(task));
    },
    deleteTask(taskId, storyId) {
        dispatch(tasksActions.deleteTask(taskId));
        dispatch(storyActions.removeTaskFromStory(taskId, storyId));
    }
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
