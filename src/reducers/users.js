import { RECIEVE_USERS } from '../actions/users'
import { SAVE_QUESTION, SAVE_QUESTION_ANSWER } from '../actions/questions'

export default function users(state = {}, action){
    switch(action.type){
        case RECIEVE_USERS:
            return {
                ...state,
                ...action.users,
            }

        case SAVE_QUESTION_ANSWER:
            const { answerInfo } = action
            console.log(answerInfo)
            return {
                ...state,
                [answerInfo.authedUser]: {
                    ...state[answerInfo.authedUser],
                    answers: {
                        ...state[answerInfo.authedUser].answers,
                        [answerInfo.qid]: answerInfo.answer
                    }
                }
            }

        case SAVE_QUESTION:
            const authedUser = action.question.author;
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    questions: state[authedUser].questions.concat([action.question.id])
                }
            }

        default:
            return state
    }
}