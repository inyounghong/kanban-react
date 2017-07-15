import { combineReducers } from 'redux';
import lanesReducer from './lanes';
import notesReducer from './notes';
import tagsReducer from './tags';
import tasksReducer from './tasks';
import appReducer from './app';

export default combineReducers({
  lanes: lanesReducer,
  notes: notesReducer,
  tags: tagsReducer,
  tasks: tasksReducer,
  app: appReducer,
});
