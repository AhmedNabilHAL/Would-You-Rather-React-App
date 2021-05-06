import { _getUsers, _getQuestions } from '../utils/_DATA'
import { recieveUsers } from './users'
import { recieveQuestions } from './questions'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData(){
    return (dispatch) => {
      dispatch(showLoading());
        return Promise.all([
            _getUsers(),
            _getQuestions(),
          ]).then(([users, questions]) => {
            dispatch(recieveUsers(users));
            dispatch(recieveQuestions(questions));
            dispatch(setAuthedUser(null));
            dispatch(hideLoading());
          })
    }
}