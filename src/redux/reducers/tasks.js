import * as actionTypes from '../../constants/actionTypes';

export default function tasks(state = [], action) {
  switch (action.type) {
    case actionTypes.CREATE_TASK:
      return state.concat(action.payload);

    case actionTypes.UPDATE_TASK:
    console.log("updating task");
      return state.map(task => {
        if(task.id === action.payload.id) {
          return Object.assign({}, task, action.payload);
        }
        return task;
      });

    case actionTypes.DELETE_TASK:
      return state.filter(task => task.id !== action.payload.id);

    default:
      return state;
  }
}
