import { combineReducers } from 'redux';

import user from './userReducer';
import loading from './loadingReducer';
import posts from './postReducer';

const rootReducer = combineReducers({ user, loading, posts });

export default rootReducer;
