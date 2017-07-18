import uuid from 'uuid';
import * as actionTypes from '../../constants/actionTypes';

function selectNote(noteId) {
  return {
    type: actionTypes.SELECT_NOTE,
    payload: noteId,
  };
}

export default {
  selectNote,
};
