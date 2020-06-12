import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import './App.css';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import HomePage from './pages/homepage/homepage.component';
import ProfilePage from './pages/profile/profile.component';
import AdminPage from './pages/admin/adminpage.component';
import QuestionPage from './pages/question/questionpage.component';

const test = () => {
  return (
    <div>
      <h1>test page</h1>
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: '',
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
          console.log(this.state.currentUser);
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  // this is a comment
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
                this.state.currentUser ? <ProfilePage /> : <Redirect to='/' />
              }
            />
            <Route exact path='/test' component={test} />
            <Route
              path='/question/:slug'
              render={(props) => <QuestionPage content={props} />}
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
