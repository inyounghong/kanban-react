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

/**
 * Returns the action to create a task
 * @param  {String} text Task text
 * @return {Object}
 */
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

/**
 * Returns the action to update a task
 * @param  {Object} updatedTask Object with task properties to update. It must
 * have a valid id.
 * @return {Object}
 */
function updateTask(updatedTask) {
  if((typeof updatedTask !== 'object') || (!isV4(updatedTask.id))) {
    throw new Error(`params ${updatedTask}`);
  }
  return {
    type: actionTypes.UPDATE_TASK,
    payload: updatedTask,
  };
}

/**
 * Returns the action to delete a task
 * @param  {String} id Task id
 * @return {Object}
 */
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

export default {
  createTask,
  updateTask,
  deleteTask,
};
