import React from 'react';

import { signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ email: '', password: '' });
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
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
          <input
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.handleChange}
            label='password'
            required
          />
          <div className='buttons'>
            <button type='submit'>Sign in</button>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
