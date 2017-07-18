import Column from '../components/Column.jsx';
import tasksActions from '../redux/actions/tasks';
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import * as itemTypes from '../constants/itemTypes';
import { connect } from 'react-redux';
import { handleHover } from '../helpers'


const columnTarget = {
    hover(targetProps, monitor) {
        handleHover(targetProps, monitor.getItem(), itemTypes.COLUMN);
    },
};

const mapStateToProps = (state) => ({
    allStories: state.stories,
    allTasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
    moveTask(source, target) {
        dispatch(tasksActions.moveTask(source, target));
    },
    updateTask(task) {
        dispatch(tasksActions.updateTask(task));
    }
});

const collectDropTarget = (connect) => ({
    connectDropTarget: connect.dropTarget(),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    DropTarget(itemTypes.TASK, columnTarget, collectDropTarget)(Column)
);
