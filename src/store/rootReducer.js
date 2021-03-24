import { combineReducers } from 'redux';
import authReducer from './authReducer/authReducer';
import tasksReducer from './tasksReducer/tasksReducer';


export const rootReducer = combineReducers({
    tasks: tasksReducer,
    auth: authReducer,
})



