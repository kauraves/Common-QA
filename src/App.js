import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import HomePage from './pages/homepage/homepage.component';
import ProfilePage from './pages/profile/profile.component';
import AdminPage from './pages/admin/adminpage.component';
import QuestionPage from './pages/question/questionpage.component';
import EditAnswer from './components/answers/edit-answer.component';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    // open messaging system between our App and firebase
    // open subscription
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // this will LISTEN to the userRef AND get back first state of that data
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });

          console.log('DEMO: Current user:', this.state.currentUser);
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className='App'>
        <Header currentUser={this.state.currentUser} />
        <div className='content'>
          <Switch>
            <Route exact path='/' render={() => <HomePage />} />
            <Route
              exact
              path='/login'
              render={() =>
                this.state.currentUser ? (
                  <Redirect to='/' />
                ) : (
                  <SignInAndSignUpPage />
                )
              }
            />

            <Route
              exact
              path='/profile'
              render={() =>
                this.state.currentUser ? (
                  <ProfilePage currentUser={this.state.currentUser} />
                ) : (
                  <Redirect to='/' />
                )
              }
            />

            <Route
              exact
              path='/question/:slug'
              render={(props) =>
                this.state.currentUser ? (
                  <QuestionPage
                    content={props}
                    isAdmin={this.state.currentUser.isAdmin}
                  />
                ) : (
                  <QuestionPage content={props} isAdmin={false} />
                )
              }
            />
            <Route
              exact
              path='/question/:slug/:slug/edit'
              render={(props) =>
                this.state.currentUser ? (
                  <EditAnswer
                    props={this.state}
                    answer_id={props.location.state.answer_id}
                    question_id={props.location.state.question_id}
                  />
                ) : (
                  <Redirect to={this.props.history.goBack()} />
                )
              }
            />
            <Route
              exact
              path='/admin'
              render={() =>
                this.state.currentUser.isAdmin ? (
                  <AdminPage />
                ) : (
                  <Redirect to='/' />
                )
              }
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
