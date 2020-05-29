import React from 'react';
import './App.css';
import SignIn from './components/sign-in/sign-in.component';

import { auth } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
      user: '',
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
      console.log(user);
    });
  }

  render() {
    return (
      <div className='App'>
        <h1>Hello</h1>
        <p>Our fancy groupwork comes here</p>
        <SignIn name='Niina' />
      </div>
    );
  }
}

export default App;
