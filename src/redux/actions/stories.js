import uuid from 'uuid';
import * as actionTypes from '../../constants/actionTypes';
import { isV4 } from '../../helpers';


function createStory(text) {
  if(typeof text !== 'string') {
    throw new Error(`params ${text}`);
  }

  return {
    type: actionTypes.CREATE_STORY,
    payload: {
      id: uuid.v4(),
      editing: false,
      text,
      tags: [],
      tasks: [],
    },
  };
}

function updateStory(updatedStory) {
  if((typeof updatedStory !== 'object') || (!isV4(updatedStory.id))) {
    throw new Error(`params ${updatedStory}`);
  }

  return {
    type: actionTypes.UPDATE_STORY,
    payload: updatedStory,
  };
}

/**
 * Returns the action to delete a story
 * @param  {String} id Story id
 * @return {Object}
 */
function deleteStory(id) {
  if(!isV4(id)) {
    throw new Error(`params ${id}`);
  }

  return {
    type: actionTypes.DELETE_STORY,
    payload: {
      id,
    },
  };
}

function addTaskToStory(storyId, taskId) {
  if((!isV4(storyId)) || (!isV4(taskId))) {
    throw new Error(`params ${storyId} ${taskId}`);
  }
  return {
    type: actionTypes.ADD_TASK_TO_STORY,
    payload: {
      storyId,
      taskId,
    },
  };
}

function removeTaskFromStory(storyId, taskId) {
  if((!isV4(storyId)) || (!isV4(taskId))) {
    throw new Error(`params ${storyId} ${taskId}`);
  }
  return {
    type: actionTypes.REMOVE_TASK_FROM_STORY,
    payload: {
      storyId,
      taskId,
    },
  };
}

export default {
  createStory,
  updateStory,
  deleteStory,
  addTaskToStory,
  removeTaskFromStory,
};
