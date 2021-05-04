import React from 'react'
import { connect } from 'react-redux'

function Question(props) {

    if (props.question === null) return <p>This question doesn't exist.</p>
    return (
        <div className='box_container'>
            <div className='author'>
                {props.question.authorName} asks:
            </div>
            <div className='box_body'>
                <div className='avatar_container'>
                    <img src={props.question.authorAvatar} alt="Avatar" className='avatar' />
                </div>
                <div className='box_info'>
                    <h3>Would you Rather...</h3>
                    {props.childComponent}
                </div>
            </div>
        </div>
    )
    
}

function mapStateToProps({ users, questions }, props){
    const id = props.id
    const question = questions[id]

    return {
        question: question ? {
                authorName: users[question.author].name,
                authorAvatar: users[question.author].avatarURL,
            } : null
    }
}
export default connect(mapStateToProps)(Question)