import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router-dom'

function QuestionStub(props) {
    return (
        <div className='box_content'>
            <div className='box_content_item'>
                ...{props.question.sampleText}...
            </div>
            
            <div className='box_content_item btn_container'>
                <Link to={`/questions/${props.question.id}`} className='btn'>
                    View Poll
                </Link>
            </div>
        </div>
    )
}

function mapStateToProps({ authedUser, questions }, props){
    const id = props.id
    const question = questions[id]

    return {
        authedUser,
        question: question ? {
                id: question.id,
                sampleText: question.optionOne.text,
            } : null
    }
}

export default connect(mapStateToProps)(QuestionStub)