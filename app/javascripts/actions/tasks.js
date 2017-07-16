import uuid from 'uuid';
import * as actionTypes from '../constants/actionTypes';

/**
 * Checks if String is valid v4 id
 * @param  {String} id Id to be checked
 * @return {Boolean}
 */
function isV4(id) {
  if(typeof id !== 'string') {
    return false;
  }
  return /^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/.test(id);
}

function createTask(task) {
  if(typeof task !== 'string') {
    throw new Error(`params ${task}`);
  }
  return {
    type: actionTypes.CREATE_TASK,
    payload: {
      id: uuid.v4(),
      text: task,
    },
  };
}

function updateTask(updatedTask) {
  if((typeof updatedTask !== 'object') || (!isV4(updatedTask.id))) {
    throw new Error(`params ${updatedTask}`);
  }
  return {
    type: actionTypes.UPDATE_TASK,
    payload: updatedTask,
  };
}

function deleteTask(id) {
  if(!isV4(id)) {
    throw new Error(`params ${id}`);
  }
  return {
    type: actionTypes.DELETE_TASK,
    payload: {
      id,
    },
  };
}

function moveTask(sourceId, targetId) {
    if((!isV4(sourceId)) || (!isV4(targetId))) {
        throw new Error(`params ${sourceId} ${targetId}`);
    }
    return {
        type: actionTypes.MOVE_TASK,
        payload: {
            sourceId,
            targetId,
        },
    };
}

export default {
  createTask,
  updateTask,
  deleteTask,
  moveTask,
};
