import uuid from 'uuid';
import * as actionTypes from '../../constants/actionTypes';
import * as itemTypes from '../../constants/itemTypes';
import * as columnTypes from '../../constants/columnTypes';
import { isV4 } from '../../helpers';


function createTask(task) {
  if(typeof task !== 'string') {
    throw new Error(`params ${task}`);
  }
  return {
    type: actionTypes.CREATE_TASK,
    payload: {
      id: uuid.v4(),
      text: task,
      status: columnTypes.TODO,
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

function moveTask(source, target) {
    // if((!isV4(sourceId.taskId)) || (!isV4(targetId.taskId))) {
    //     throw new Error(`params ${sourceId} ${targetIdId}`);
    // }
    return {
        type: actionTypes.MOVE_TASK,
        payload: {
            source,
            target,
        },
    };
}

export default {
  createTask,
  updateTask,
  deleteTask,
  moveTask,
};
