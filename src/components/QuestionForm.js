import React, { Component } from 'react'
import { connect } from "react-redux"
import { handleSaveQuestionAnswer } from '../actions/questions'


class QuestionForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedOption: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e){
        e.preventDefault()
        if (this.state.selectedOption === null) return alert('Please provide an answer')
        this.props.dispatch(handleSaveQuestionAnswer(this.props.question.id, this.state.selectedOption))
    }
    
    handleChange(e){
        this.setState({
            selectedOption: e.target.value
        });
    }

    render() {
        if (this.props.question === null) return <p>This question doesn't exist.</p>
        const { optionOneVotes, optionTwoVotes } = this.props.question
        const totalVotes = optionOneVotes + optionTwoVotes
        if (this.props.question.answer) 
            return (
                <div className='box_content'>
                    <div className={this.props.question.answer === 'optionOne' ?
                        'answer active' : 'answer'}>
                        <div className='box_content_item'>
                            {this.props.question.optionOne}
                            <br />{optionOneVotes} out of {totalVotes} votes. ({Math.round(optionOneVotes*100/totalVotes)}%)
                        </div>
                    </div>
                    <div className={this.props.question.answer === 'optionTwo' ?
                        'answer active' : 'answer'}>
                        <div className='box_content_item'>
                            {this.props.question.optionTwo} 
                            <br />{optionTwoVotes} out of {totalVotes} votes. ({Math.round(optionTwoVotes*100/totalVotes)}%)
                        </div>
                    </div>
                </div>
            ) 
        return (
            <form className='box_content' onSubmit={this.handleSubmit}>
                <div className='box_content_item'>
                    <label>
                        <input type="radio" id="optionOne" 
                            value="optionOne" 
                            checked={this.state.selectedOption === "optionOne"}
                            onChange={this.handleChange} />
                        {this.props.question.optionOne}
                    </label>
                </div>
                <div className='box_content_item'>
                    <label>
                        <input type="radio" id="optionTwo" 
                            value="optionTwo" 
                            checked={this.state.selectedOption === "optionTwo"}
                            onChange={this.handleChange} />
                        {this.props.question.optionTwo}
                    </label>
                </div>
                <div className='box_content_item btn_container'>
                    <button onClick={this.handleSubmit} className='btn'>
                        Submit
                    </button>
                </div>
            </form>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, props){
    const id = props.id

    const question = questions[id]

    return {
        authedUser,
        question: question ? {
                id: question.id,
                optionOne: question.optionOne.text,
                optionTwo: question.optionTwo.text,
                optionOneVotes: question.optionOne.votes.length,
                optionTwoVotes: question.optionTwo.votes.length,
                answer: users[authedUser] && users[authedUser].answers ? 
                    users[authedUser].answers[question.id] : null
            } : null
    }
}

export default connect(mapStateToProps)(QuestionForm)