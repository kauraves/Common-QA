import React from 'react';
import { findUserProfileDocument } from '../../firebase/firebase.utils';

class EditUsers extends React.Component {
  constructor() {
    super();

    this.state = {
      userEmail: '',
      userDetails: '',
      userUid: '',
    };
  }

  findUser = async (event) => {
    event.preventDefault();
    console.log(this.state.userEmail);
    let uid = await findUserProfileDocument(this.state.userEmail);
    // await console.log(uid);
    await this.setState({ userUid: uid }, console.log(this.state.userUid));
    //await console.log(this.state.userUid);
    //this.editUser(userUID)
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='edit-users'>
        <h3>Edit users</h3>
        <p>Find user by name:</p>
        <form onSubmit={this.findUser}>
          <input
            type='text'
            name='userEmail'
            value={this.state.userEmail}
            onChange={this.handleChange}
            label='email'
            required></input>

          <button type='submit'>Find user</button>
        </form>
      </div>
    );
  }
}

export default EditUsers;
