import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

function Nav (props) {
    function handleClick(){
        props.dispatch(setAuthedUser(null))
    }
    return (
        <nav className='nav'>
        <ul>
            <li>
                <NavLink to='/' exact className='nav_link' activeClassName='active'>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to='/new' exact className='nav_link' activeClassName='active'>
                    New Question
                </NavLink>
            </li>
            <li>
                <NavLink to='/leaderboard' exact className='nav_link' activeClassName='active'>
                    Leader Board
                </NavLink>
            </li>
            {props.authedUser && 
            <li>
                <span>Hello, {props.authedUser}</span>
            </li>}
            {props.authedUser && <li>
                <NavLink to='/login' exact className='nav_link' activeClassName='active' onClick={handleClick}>
                    Logout
                </NavLink>
            </li>}
        </ul>
        </nav>
    )
}

function mapStateToProps({ authedUser, users }){
    return {
        authedUser: authedUser ? users[authedUser].name : null,
    }
}

export default connect(mapStateToProps)(Nav)