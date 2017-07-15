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
 * Returns the action to create a tag
 * @param  {String} text Tag text
 * @return {Object}
 */
function createTag(tag) {
  if(typeof tag !== 'string') {
    throw new Error(`params ${tag}`);
  }
  return {
    type: actionTypes.CREATE_TAG,
    payload: {
      id: uuid.v4(),
      name: tag,
    },
  };
}

/**
 * Returns the action to update a tag
 * @param  {Object} updatedTag Object with tag properties to update. It must
 * have a valid id.
 * @return {Object}
 */
function updateTag(updatedTag) {
  if((typeof updatedTag !== 'object') || (!isV4(updatedTag.id))) {
    throw new Error(`params ${updatedTag}`);
  }
  return {
    type: actionTypes.UPDATE_TAG,
    payload: updatedTag,
  };
}

/**
 * Returns the action to delete a tag
 * @param  {String} id Tag id
 * @return {Object}
 */
function deleteTag(id) {
  if(!isV4(id)) {
    throw new Error(`params ${id}`);
  }
  return {
    type: actionTypes.DELETE_TAG,
    payload: {
      id,
    },
  };
}

export default {
  createTag,
  updateTag,
  deleteTag,
};
