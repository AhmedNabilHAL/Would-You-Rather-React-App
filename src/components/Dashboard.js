import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import QuestionList from './QuestionList'

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            filter: 'unanswered'
        }
    }
    render(){
        if (this.props.authedUser === null) return <Redirect to='/login' />
        return (
            <div className='box_list_container'>
                <div className='filter'>
                    <button onClick={() => { this.setState({filter:'unanswered'})}}
                        className={this.state.filter === 'unanswered' ? 'btn active' : 'btn'}>
                            Unanswered Questions
                    </button>
                    <button onClick={() => { this.setState({filter:'answered'})}}
                        className={this.state.filter === 'answered' ? 'btn active' : 'btn'}>
                            Answered Questions
                    </button>
                </div>
                <QuestionList filter={this.state.filter} />
            </div>
        )
    }
    
}

export default connect(({ authedUser }) => ({authedUser}))(Dashboard)