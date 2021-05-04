import React from 'react'
import Question from './Question'
import { connect } from 'react-redux'
import QuestionStub from './QuestionStub'

function QuestionList(props){
    return (
        <ul>
            {props.filter === 'unanswered' && props.unAnsweredQuestionIds.map(id => (
                <li key={id}>
                    <Question id={id} 
                        childComponent={<QuestionStub id={id} />}/>
                </li>
            ))}
            {props.filter === 'answered' && props.answeredQuestionIds.map(id => (
                <li key={id}>
                    <Question id={id} 
                        childComponent={<QuestionStub id={id} />}/>
                </li>
            ))}
        </ul>
    )
}

function mapStateToProps({ authedUser, users, questions }){
    let answered = [], unanswered = [];
    if (users[authedUser] && users[authedUser].answers){
        unanswered = Object.keys(questions).filter(qid => !users[authedUser].answers.hasOwnProperty(qid))
        answered = Object.keys(questions).filter(qid => users[authedUser].answers.hasOwnProperty(qid))
    }
    
    return {
        unAnsweredQuestionIds: unanswered,
        answeredQuestionIds: answered,
    }
}
export default connect(mapStateToProps)(QuestionList)