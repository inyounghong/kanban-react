import { combineReducers } from 'redux';
import lanesReducer from './lanes';
import storiesReducer from './stories';
import tagsReducer from './tags';
import tasksReducer from './tasks';
import appReducer from './app';

export default combineReducers({
  lanes: lanesReducer,
  stories: storiesReducer,
  tags: tagsReducer,
  tasks: tasksReducer,
  app: appReducer,
});
