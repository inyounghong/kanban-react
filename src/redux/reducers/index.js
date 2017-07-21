import { combineReducers } from 'redux';
import storiesReducer from './stories';
import tagsReducer from './tags';
import tasksReducer from './tasks';
import appReducer from './app';

export default combineReducers({
  stories: storiesReducer,
  tags: tagsReducer,
  tasks: tasksReducer,
  app: appReducer,
});
