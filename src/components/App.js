import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import '../App.css';
import logo from '../logo.svg';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard'
import Nav from './Nav'
import Question from './Question'
import QuestionForm from './QuestionForm'
import NewQuestion from './NewQuestion';
import UserList from './UserList'
import Login from './Login';
// TODO 1: make QuestionStub
// TODO 2: make question stub link to questions/qid
// TODO 3: QuestionList should render stubs & should filter questions depending on props.filter
// TODO 4: add routes to App
// TODO 5: route questions/qid renders Question form
// TODO 6: if question was answered by authed user render the answer
// TODO 7: make NewQuestion
// TODO 8: make UserList & User
// TODO 9: make Login 
// TODO 9.5: refactor the logo in App
// TODO 10: Nav bar should switch to login link when logged out
// TODO 11: redirect to /login whenever unauthenticated 
//  user tries to (create new question, vote on a question, after logging out)
class App extends Component{
  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <Fragment>
            <LoadingBar />
            <div className='container'>
              <Nav />
              {this.props.loading === true
                ? null
                : <Fragment>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/new' exact component={NewQuestion} />
                    <Route path='/questions/:id' exact render={(props)=>(
                      <Question id={props.match.params.id} 
                        childComponent={<QuestionForm id={props.match.params.id} />} />
                    )} />
                    <Route path='/leaderboard' exact component={UserList} />
                    <Route path='/login' exact component={Login} />
                  </Fragment>}
            </div>
          </Fragment>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps ({ loadingBar }) {
  return {
    loading: loadingBar.default === 1,
  }
}

export default connect(mapStateToProps)(App);
