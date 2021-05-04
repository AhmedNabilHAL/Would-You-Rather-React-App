import React from 'react'
import { connect } from 'react-redux'

function User(props) {

    if (props.user === null) return <p>This user doesn't exist.</p>
    return (
        <div className='box_container'>
            <div className='author'>
                {props.user.name}
            </div>
            <div className='box_body'>
                <div className='avatar_container'>
                    <img src={props.user.avatar} alt="Avatar" className='avatar' />
                </div>
                <div className='box_info'>
                    
                    <div className='box_content'>
                        <div className='box_content_item'>
                            Answered questions {props.user.answers}
                        </div>
                        
                        <div className='box_content_item'>
                            Created questions {props.user.questions}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

function mapStateToProps({ authedUser, users }, { id }){
    const user = users[id]
    
    return {
        authedUser,
        user: user ? {
            name: user.name,
            avatar: user.avatarURL,
            answers: Object.keys(user.answers).length,
            questions: user.questions.length,
        } : null
    }
}

export default connect(mapStateToProps)(User)