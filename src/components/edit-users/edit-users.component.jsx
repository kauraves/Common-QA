import React from 'react';
import {
  findUserProfileDocument,
  showUserDocument,
  editUser,
} from '../../firebase/firebase.utils';

class EditUsers extends React.Component {
  constructor() {
    super();

    this.state = {
      userEmail: '',
      userUid: '',
      statusFound: false,
      userData: [],
    };
  }

  findUser = async (e) => {
    e.preventDefault();

    let userUid = await findUserProfileDocument(this.state.userEmail);
    if (!userUid.empty) {
      await this.setState({ userUid: userUid.docs[0].id });

      let userData = await showUserDocument(this.state.userUid);
      await this.setState({ userData: { ...userData } });
      await this.setState({ statusFound: true });
    } else {
      this.setState({ userEmail: '' });
      console.log('Nothing to see in here');
    }

    await console.log(this.state);
  };

  changeAdminStatus = async (e) => {
    if (this.state.userUid) {
      await this.setState({
        isAdmin: editUser(this.state.userUid, this.state.userData.isAdmin),
      });

      this.findUser(e);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='edit-users'>
        <h3>Edit users</h3>
        <p>Find user by email:</p>
        <form onSubmit={(e) => this.findUser(e, true)}>
          <input
            type='text'
            name='userEmail'
            value={this.state.userEmail}
            onChange={this.handleChange}
            label='email'
            required></input>
          <button type='submit'>Find user</button>
        </form>

        <div>
          {this.state.userData.isAdmin ? 'admin' : 'user'}

          <button onClick={this.changeAdminStatus}>
            EDIT FOUND USERS ADMIN status
          </button>
        </div>
      </div>
    );
  }
}

export default EditUsers;
