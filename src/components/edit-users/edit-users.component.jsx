import React from 'react';
import {
  findUserProfileDocument,
  showUserDocument,
} from '../../firebase/firebase.utils';

class EditUsers extends React.Component {
  constructor() {
    super();

    this.state = {
      userEmail: '',
      userUid: '',
    };
  }

  findUser = async (event) => {
    event.preventDefault();
    let userUid = await findUserProfileDocument(this.state.userEmail);
    //
    if (!userUid.empty) {
      await this.setState({ userUid: userUid.docs[0].id });

      let userData = await showUserDocument(this.state.userUid);
      await this.setState({ ...userData });
    } else {
      this.setState({ userEmail: '' });
      console.log('Nothing to see in here');
    }

    await console.log(this.state);
    //await console.log('yay', userData);

    // await console.log('yay', this.state); //console.log(userData.docs[0].id); //this.setState({ userName: userData }, console.log(this.state));
    //await console.log(this.state);
    //await console.log('Userdata: ', userData);
    // await console.log(uid);
    //await this.setState({ userUid: uid }, console.log(this.state.userUid));
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
