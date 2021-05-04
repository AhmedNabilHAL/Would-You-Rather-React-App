import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
    constructor(props){
        super(props)
        this.state = {
            optionOne: '',
            optionTwo: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault()
        const { optionOne, optionTwo } = this.state
        this.props.dispatch(handleSaveQuestion(optionOne, optionTwo))
        this.setState({
            optionOne: '',
            optionTwo: ''
        })
    }

    render(){
        if (this.props.authedUser === null) return <Redirect to='/login' />
        return (
            <div className='box_container'>
                <div className='author'>
                    Create New Question
                </div>
                <div className='box_info'>
                    <h3>Would you Rather...</h3>
                    <form className='box_content' onSubmit={this.handleSubmit}>
                        <div className='box_content_item'>
                            <input type="text" id="optionOne" placeholder='Enter Option One Text Here'
                                    value={this.state.optionOne}
                                    className='text_input'
                                    onChange={this.handleChange} />
                        </div>
                        <div className='box_content_item'>
                            <input type="text" id="optionTwo" placeholder='Enter Option Two Text Here'
                                    value={this.state.optionTwo}
                                    className='text_input'
                                    onChange={this.handleChange} />
                        </div>
                        <div className='box_content_item btn_container'>
                            <button onClick={this.handleSubmit} 
                                disabled={this.state.optionOne === '' || this.state.optionTwo === ''}
                                className='btn'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

export default connect(({ authedUser }) => ({authedUser}))(NewQuestion)