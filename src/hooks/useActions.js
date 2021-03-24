
import {useDispatch} from 'react-redux'
import { bindActionCreators } from 'redux'


import * as tasksActions from '../store/tasksReducer/actions'
import * as authActions from '../store/authReducer/actions'

const ActionCreators = {
    ...tasksActions,
    ...authActions
}


export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}