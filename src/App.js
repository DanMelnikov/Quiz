import React from 'react';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import Auth from './containers/Auth/Auth';
import QuizList from './containers/QuizList/QuizList';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Logout from './components/Logout/Logout';
import { autoLogin } from './redux/actions/auth';

class App extends React.Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/' component={QuizList} />
        <Redirect to='/' />
      </Switch>
    );
  
    if (this.props.isLogin) {
      routes = (
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator} />
          <Route path='/quiz/:id' component={Quiz} />
          <Route path='/logout' component={Logout} />
          <Route path='/' component={QuizList} />
          <Redirect to='/' />
        </Switch>
      );
    }

    return (
      <div className="App">
        <Layout>
          { routes }
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLogin: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
