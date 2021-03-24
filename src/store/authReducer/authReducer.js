
import { LOGIN_USER, LOGOUT, SET_ERROR } from './actionTypes'


const initialState = {
  loading: false,
  error: null,
  token: null,
  isAuth: false
}

export default function authReducer (state = initialState, action) {
  switch(action.type) {
    case LOGIN_USER:
      return {
        ...state,
        token: action.payload,
        isAuth: true
      }
      case LOGOUT:
        return {
            ...state,
            token: null,
            sessionId: null,
            isAuth: false
        }
      case SET_ERROR:
        return {
            ...state,
            error: action.payload
        }

    default:
      return state
  }
}

