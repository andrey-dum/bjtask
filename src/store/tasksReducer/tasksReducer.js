
import * as tasksActions  from './actionTypes'


const initialState = {
  tasks: [],
  loading: false,
  pageLimit: 3,
  total_task_count: 0,
  page: 1,
  error: null,
  editMode: false,
  sort_direction: 'asc',
  sort_field: 'id',
  alert: null,

}

export default function tasksReducer (state = initialState, action) {
  switch(action.type) {
    case tasksActions.FETCH_TASKS_START:
      return {
        ...state,
        loading: true
      }
    case tasksActions.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        loading: false
      }
    case tasksActions.FETCH_TASKS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case tasksActions.SET_TOTAL_TASKS_COUNT:
      return {
        ...state,
        total_task_count: action.payload
      }
    case tasksActions.SET_SORT_FIELD:
      return {
        ...state,
				sort_field: action.payload
      }
    case tasksActions.SET_SORT_DIRECTION:
      return {
        ...state,
				sort_direction: action.payload
      }
    case tasksActions.CHANGE_PAGE:
      return {
        ...state,
				page: action.payload
      }
    case tasksActions.SHOW_ALERT:
      return {
        ...state,
				alert: action.payload
      }
    case tasksActions.HIDE_ALERT:
      return {
        ...state,
				alert: null
      }

    default:
      return state
  }
}

