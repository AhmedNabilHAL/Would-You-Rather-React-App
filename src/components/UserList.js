import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import User from './User'

function UserList(props){
    if (props.authedUser === null) return <Redirect to='/login' />
    return (
        <div className='box_list_container'>
            {props.usersId.map(id => (
                <li key={id}>
                    <User id={id} />
                </li>
            ))}
        </div>
    )
}

function mapStateToProps({ authedUser, users }){
    return {
        authedUser,
        usersId: Object.keys(users),
    }
}

export default connect(mapStateToProps)(UserList)