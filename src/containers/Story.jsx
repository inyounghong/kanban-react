import Story from '../components/Story.jsx';
import tasksActions from '../redux/actions/tasks';
import storyActions from '../redux/actions/stories';
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import * as itemTypes from '../constants/itemTypes';
import { connect } from 'react-redux';
import { handleHover } from '../helpers'


// const columnTarget = {
//     hover(targetProps, monitor) {
//         // console.log(targetProps.dispatch);
//         handleHover(targetProps, monitor.getItem(), itemTypes.COLUMN);
//     },
// };

const mapStateToProps = (state) => ({
    isColumnView: state.app.isColumnView,
});
    // {
    // allStories: state.stories,
    // allTasks: state.tasks,
// });

const mapDispatchToProps = (dispatch) => ({
    // Tasks
    addTask(storyId) {
        const newTask = tasksActions.createTask("New Task");
        dispatch(newTask);
        dispatch(storyActions.addTaskToStory(storyId, newTask.payload.id));
    },
    // Stories
    updateStory(story) {
        dispatch(storyActions.updateStory(story));
    },

});

const collectDropTarget = (connect) => ({
    // connectDropTarget: connect.dropTarget(),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    (Story)
    // DropTarget(itemTypes.TASK, columnTarget, collectDropTarget)(Column)
);
