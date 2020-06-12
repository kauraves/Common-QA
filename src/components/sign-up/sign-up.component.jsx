import React from 'react';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.css';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      console.log({ displayName });
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='sign-up'>
        <h3 className='title'>I don't have an account yet</h3>
        <span>Sign up with email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            label='Display Name'
            required></input>
          <label htmlFor='displayName'>Name</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='Email'
            required></input>
          <label htmlFor='email'>Email</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='Password'
            required></input>
          <label htmlFor='passwprd'>Password</label>
          <input
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Confirm Password'
            required></input>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <div className='buttons'>
            <button type='submit'>SIGN UP</button>{' '}
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
