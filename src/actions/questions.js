import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA"
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECIEVE_QUESTIONS = 'RECIEVE_QUESTIONS'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'
export const SAVE_QUESTION = 'SAVE_QUESTION'

export function recieveQuestions(questions){
    return {
        type: RECIEVE_QUESTIONS,
        questions,
    }
}

export function saveQuestionAnswer (answerInfo){
    return {
        type: SAVE_QUESTION_ANSWER,
        answerInfo,
    }
}

export function handleSaveQuestionAnswer (qid, answer){
    return (dispatch, getState) => {
        const { authedUser } = getState()
        
        dispatch(showLoading())

        _saveQuestionAnswer({
            authedUser,
            qid,
            answer
        }).then(() => {
            dispatch(saveQuestionAnswer({
                authedUser,
                qid,
                answer
            }))
            dispatch(hideLoading())
        }).catch((e) => {
            console.log(e)
        })
    }
}

export function saveQuestion(question){
    return {
        type: SAVE_QUESTION,
        question,
    }
}

export function handleSaveQuestion(optionOneText, optionTwoText){
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        
        _saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser,
        }).then(question => {
            dispatch(saveQuestion(question))
            dispatch(hideLoading())
        })

    }
}