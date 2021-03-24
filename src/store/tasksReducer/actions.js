import { tasksAPI } from '../../api/api'
import * as tasksActions  from './actionTypes'


export function fetchTasksStart() {
	return {
    type: tasksActions.FETCH_TASKS_START
  }
}

export function fetchTasksSuccess(tasks) {
  return {
    type: tasksActions.FETCH_TASKS_SUCCESS,
		payload: tasks
  }
}

export function fetchTasksError(error) {
  return {
    type: tasksActions.FETCH_TASKS_ERROR,
    payload: error
  }
}

export function setTotalTasksCount(total) {
  return {
    type: tasksActions.SET_TOTAL_TASKS_COUNT,
    payload: total
  }
}

export function setSortField(sortFiled) {
  return {
    type: tasksActions.SET_SORT_FIELD,
    payload: sortFiled
  }
}

export function setSortDirection(sortDirection) {
  return {
    type: tasksActions.SET_SORT_DIRECTION,
    payload: sortDirection
  }
}

export function changePage(page) {
  return {
    type: tasksActions.CHANGE_PAGE,
    payload: page
  }
}

export function showAlert(alertObj) {
  return {
    type: tasksActions.SHOW_ALERT,
    payload: alertObj
  }
}

export function hideAlert() {
  return {
    type: tasksActions.HIDE_ALERT
  }
}






export function fetchTasks(params = {}) {
 return async dispatch => {
    dispatch(fetchTasksStart())
      try {
        // const params = {
        //       page: page,
        //       sort_field: sortField,
        //       sort_direction: sort_direction
        //   }
        const response = await tasksAPI.getTasks(params)

        if(response.status === 'error') {
            dispatch(fetchTasksError(response.message))
        } else {
            dispatch(fetchTasksSuccess(response.message.tasks))
            dispatch(setTotalTasksCount(+response.message.total_task_count))
        }
      } catch (error) {
          dispatch(fetchTasksError(error))
      }
    }
}




export function update(data) {
 return async dispatch => {
    try {
      const response = await tasksAPI.editTask(data)

      if(response.status === 'error') {
        console.log(response.message);
      } else {
        dispatch(fetchTasks())
      }

    } catch (error) {
      console.log(error);
        }
    }
}


export function createTask(data, history) {
  return async dispatch => {
    try {
      const response = await tasksAPI.createTask(data)

      if(response.status === 'error') {
        dispatch(fetchTasksError(response.message))
      } else {
        dispatch(showAlert({type: 'success', text: "Задача успешно добавлена!!!"}))
        history.push('/')
        setTimeout(() => {
            dispatch(hideAlert())
        }, 2000)
      }
    } catch (error) {
        console.log(error);
    }
  }
}

