import * as actionTypes from '../../constants/actionTypes';

export default function app(state = null, action) {
  switch (action.type) {
    case actionTypes.SELECT_NOTE:
      return action.payload;



    default:
      return state;
  }
}
