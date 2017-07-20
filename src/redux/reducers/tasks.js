import * as actionTypes from '../../constants/actionTypes';
import * as columnTypes from '../../constants/columnTypes';

const defaultState = [
    {
        id: "1da00e1e-6609-48d9-908e-6efcac1463a6",
        text: 'Add scroll bar option for text',
        status: columnTypes.TODO,
    },
    {
        id: "83b454a9-64a6-4e83-bdbd-fb5f7281753e",
        text: 'Add top menu option',
        status: columnTypes.TODO,
    },
    {
        id: "1ffe9e08-3481-49af-ab4e-76db368df025",
        text: 'Add side menu option',
        status: columnTypes.TESTING,
    },
    {
        id: "fa774290-9b47-47e1-9eac-88c721092350",
        text: 'Add option to show mood',
        status: columnTypes.TESTING,
    }
];

export default function tasks(state = defaultState, action) {

    switch (action.type) {
        case actionTypes.CREATE_TASK:
            return state.concat(action.payload);

        case actionTypes.UPDATE_TASK:
            return state.map(task => {
                if(task.id === action.payload.id) {
                    return Object.assign({}, task, action.payload);
                }
                return task;
            });

        case actionTypes.DELETE_TASK:
            const newState = state.filter(task => task.id !== action.payload.id);
            console.log(newState);
            return newState;

        default:
            return state;
    }
}
