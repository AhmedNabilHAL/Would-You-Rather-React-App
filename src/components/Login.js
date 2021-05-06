import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId: '',
            toHome: this.props.authedUser !== null,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        this.setState({
            userId: e.target.value,
        })
    }

    handleSubmit(e){
        e.preventDefault()
        this.props.dispatch(setAuthedUser(this.state.userId))
        this.setState({
            toHome: true,
        })
    }

    render(){

        if (this.state.toHome){
            return <Redirect to='/' />
        }
        
        return (
            <div className='box_list_container'>
                <form className='box_content' onSubmit={this.handleSubmit}>
                    <div className='box_content_item login'>
                        <select name="users" 
                            id="users"
                            value={this.state.userId}
                            onChange={this.handleChange}>
                            <option value='' disabled>Select User</option>
                            {this.props.users.map(user => {
                                return <option value={user.id} key={user.id}>{user.name}</option>
                            })}
                        </select>
                    </div>
                    
                    <div className='box_content_item btn_container login'>
                        <button onClick={this.handleSubmit} className='btn'>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users }){

    return {
        authedUser,
        users: Object.keys(users).map(userId => ({ id: userId,
            name: users[userId].name }))
    }
}

export default connect(mapStateToProps)(Login)