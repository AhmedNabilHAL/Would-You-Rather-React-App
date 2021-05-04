import { RECIEVE_QUESTIONS, SAVE_QUESTION, SAVE_QUESTION_ANSWER } from '../actions/questions'

export default function questions(state = {}, action){
    switch(action.type){
        case RECIEVE_QUESTIONS:
            return {
                ...state,
                ...action.questions,
            }

        case SAVE_QUESTION_ANSWER:
            const { answerInfo } = action

            return {
                ...state,
                [answerInfo.qid]: {
                    ...state[answerInfo.qid],
                    [answerInfo.answer]: {
                        ...state[answerInfo.qid][answerInfo.answer],
                        votes: state[answerInfo.qid][answerInfo.answer].votes.concat([answerInfo.authedUser])
                    }
                }
            }

        case SAVE_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }

        default:
            return state
    }
}