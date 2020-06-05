import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import HomePage from './pages/homepage/homepage.component';
import ProfilePage from './pages/profile/profile.component';

class App extends React.Component {
  constructor() {
    super();

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
        console.log(userAuth);
        const userRef = await createUserProfileDocument(userAuth);

        // this will LISTEN to the userRef AND get back first state of that data
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
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
        {this.state.currentUser === null
          ? 'Hey stranger'
          : `Hey ${this.state.currentUser.displayName}`}
        <div className='content'>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/login' component={SignInAndSignUpPage} />

            <Route
              exact
              path='/profile'
              render={() =>
                this.state.currentUser ? (
                  <Redirect to='/profile' />
                ) : (
                  <Redirect to='/login' />
                )
              }
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
