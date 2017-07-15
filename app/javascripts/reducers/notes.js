import * as actionTypes from '../constants/actionTypes';

export default function notes(state = [], action) {
  switch (action.type) {
    case actionTypes.CREATE_NOTE:
      return state.concat(action.payload);

    case actionTypes.UPDATE_NOTE:
      return state.map(note => {
        if(note.id === action.payload.id) {
          return Object.assign({}, note, action.payload);
        }
        return note;
      });

    case actionTypes.DELETE_NOTE:
      return state.filter(note => note.id !== action.payload.id);

    case actionTypes.ADD_TASK_TO_NOTE: {
        const noteId = action.payload.noteId;
        const taskId = action.payload.taskId;
        let noteIndex;

        return state.map(note => {
          noteIndex = note.tasks.indexOf(taskId);
          if(~noteIndex) {
            return Object.assign({}, note, {
              tasks: note.tasks.filter(id => id !== taskId),
            });
          }

          if(note.id === noteId) {
            return Object.assign({}, note, {
              tasks: note.tasks.concat(taskId),
            });
          }

          return note;
        });
      }

    default:
      return state;
  }
}
