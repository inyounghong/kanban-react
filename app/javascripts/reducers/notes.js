import * as actionTypes from '../constants/actionTypes';
import update from 'react-addons-update';

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

      case actionTypes.REMOVE_TASK_FROM_NOTE: {
          const noteId = action.payload.noteId;
          const taskId = action.payload.taskId;
          let noteIndex;

          return state.map(note => {
            if(note.id === noteId) {
              return Object.assign({}, note, {
                tasks: note.tasks.filter(id => id !== taskId),
              });
            }
            return note;
          });
        }


        case actionTypes.MOVE_TASK: {
          const sourceId = action.payload.sourceId;
          const targetId = action.payload.targetId;
          const sourceNote = state.filter(note => ~note.tasks.indexOf(sourceId))[0];
          const targetNote = state.filter(note => ~note.tasks.indexOf(targetId))[0];
          const sourceTaskIndex = sourceNote.tasks.indexOf(sourceId);
          const targetTaskIndex = targetNote.tasks.indexOf(targetId);

          if(sourceNote.id === targetNote.id) {
            return state.map(note => {
              if(note.id === sourceNote.id) {
                return Object.assign({}, note, {
                  tasks: update(sourceNote.tasks, {
                    $splice: [
                      [sourceTaskIndex, 1],
                      [targetTaskIndex, 0, sourceId],
                    ],
                  }),
                });
              }

              return note;
            });
          }

          return state.map(note => {
            if(note.id === sourceNote.id) {
              return Object.assign({}, note, {
                tasks: update(note.tasks, {
                  $splice: [[sourceTaskIndex, 1]],
                }),
              });
            }

            if(note.id === targetNote.id) {
              return Object.assign({}, note, {
                tasks: update(note.tasks, {
                  $splice: [[targetTaskIndex, 0, sourceId]],
                }),
              });
            }

            return note;
          });
        }

    default:
      return state;
  }
}
