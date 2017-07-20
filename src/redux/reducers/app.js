import * as actionTypes from '../../constants/actionTypes';

const defaultState = {
    isColumnView: true,
}

export default function app(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.SELECT_NOTE:
            return action.payload;

        case actionTypes.SET_IS_COLUMN_VIEW:
            return Object.assign({}, state, {
                isColumnView: action.payload,
            });

        default:
          return state;
    }
}
