import React from 'react';
import {
  findUserProfileDocument,
  showUserDocument,
  editUser,
} from '../../firebase/firebase.utils';
import './edit-users.styles.css';

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

    await console.log('Found user: ', this.state.userData);
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

  getUserData = (data) => {
    //data = this.state.userData;
    //console.log(data);
    // Object.keys(data).map((item) => {
    //   return <div>This is: {item}</div>;
    // });
    //return <div>Object.keys(data).map((item) => {console.log(item)});</div>;
    // data.map((item, i) => {
    //   console.log('data added', i);
    //   return <div key={i} answer={item} />;
    // });
  };

  render() {
    let status = '';
    if (this.state.statusFound) {
      status = 'This user is ';
      if (this.state.userData.isAdmin) {
        status += 'an admin';
      } else {
        status += 'a subscriber';
      }
    }

    // {this.state.statusFound ? {this.state.userData.isAdmin ? 'admin' : 'user'} : null}

    return (
      <div className='edit-users'>
        <h3>Edit users</h3>
        <p>Find user by email:</p>
        <form
          className='edit-users-form'
          onSubmit={(e) => this.findUser(e, true)}>
          <input
            type='text'
            name='userEmail'
            value={this.state.userEmail}
            onChange={this.handleChange}
            label='email'
            required></input>
          <button type='submit'>Find user</button>
        </form>

        <div className='user-data'></div>

        {this.state.userData.email
          ? this.getUserData(this.state.userData)
          : null}
        {status}
        <div>
          <button onClick={this.changeAdminStatus}>
            EDIT FOUND USERS ADMIN status
          </button>
        </div>
      </div>
    );
  }
}

export default EditUsers;
