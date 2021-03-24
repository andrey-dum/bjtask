import { tasksAPI } from '../../api/api'
import { LOGIN_USER, LOGOUT, SET_ERROR } from './actionTypes'

// export function authSuccess(token) {
//     return {
//         type: AUTH_SUCCESS,
//         token
//     }
// }


export function setError (error) {
	return {
		type: SET_ERROR,
		payload: error
	}
}
export function loginUser (token) {
	return {
		type: LOGIN_USER,
		payload: token
	}
}

export function logout () {
	localStorage.removeItem('token')
	localStorage.removeItem('experationDate')
	return {
		type: LOGOUT
	}
}


export function login (username, password) {
	return async dispatch => {
		try {
			const response = await tasksAPI.login(username, password)

			if(response.status === 'error') {
				dispatch(setError(response.message))
			}	else {
				localStorage.setItem("token", response.message.token);

				const experationDate = new Date(new Date().getTime() + 24 * 3600 * 1000)
				localStorage.setItem('experationDate', experationDate)

				dispatch(loginUser(response.message))
			}

			} catch (error) {
					console.log(error);
			}

	}
}

export function autoLogin() {
	return dispatch => {
		const token = localStorage.getItem('token')
		if (!token) {
				dispatch(logout())
		} else {
				const expirationDate = new Date(localStorage.getItem('experationDate'))
				if (expirationDate <= new Date()) {
						dispatch(logout())
				} else {
					dispatch(loginUser(token))
				}
			}
	}
}

