import * as actionTypes from '../constants/actionTypes';

export default function tags(state = [], action) {
  switch (action.type) {
    case actionTypes.CREATE_TAG:
      return state.concat(action.payload);

    case actionTypes.UPDATE_TAG:
      return state.map(tag => {
        if(tag.id === action.payload.id) {
          return Object.assign({}, tag, action.payload);
        }
        return tag;
      });

    case actionTypes.DELETE_TAG:
      return state.filter(tag => tag.id !== action.payload.id);

    default:
      return state;
  }
}
