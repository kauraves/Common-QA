import React from 'react';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import { withRouter } from 'react-router-dom';

import './sign-in.styles.css';

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    // Destructure email and password off of state
    const { email, password } = this.state;

    try {
      auth()
        .setPersistence(auth.Auth.Persistence.SESSION)
        .then(function () {
          return auth().signInWithEmailAndPassword(email, password);
        })
        .catch(function (error) {
          let errorCode = error.code;
          let errorMessage = error.message;

          return console.log(
            'Response: error code ',
            errorCode,
            '. Error message: ',
            errorMessage
          );
        });
      // old way
      //   await auth.signInWithEmailAndPassword(email, password);
      //   // this.props.history.push('/profile');
      //   this.setState({ email: '', password: '' });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='sign-in'>
        <h3 className='title'>I already have an account</h3>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <input
            name='email'
            type='email'
            value={this.state.email}
            onChange={this.handleChange}
            label='email'
            required
          />
          <label htmlFor='email'>Email</label>
          <input
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.handleChange}
            label='password'
            required
          />
          <label htmlFor='password'>Password</label>
          <div className='buttons'>
            <button type='submit'>Sign in</button>
            <button type='button' onClick={signInWithGoogle}>
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignIn);
