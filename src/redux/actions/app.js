import uuid from 'uuid';
import * as actionTypes from '../../constants/actionTypes';

function selectNote(noteId) {
  return {
    type: actionTypes.SELECT_NOTE,
    payload: noteId,
  };
}

function setIsColumnView(isColumnView) {
    console.log("setting to :" + isColumnView);
    return {
        type: actionTypes.SET_IS_COLUMN_VIEW,
        payload: isColumnView,
    }
}

export default {
    selectNote,
    setIsColumnView,
};
