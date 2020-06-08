import React from 'react';
import {
  findUserProfileDocument,
  showUserDocument,
  editUser,
} from '../../firebase/firebase.utils';

export const Test = (props) => {
  console.log(props);
  return <div>Hello {props}</div>;
};

class EditUsers extends React.Component {
  constructor() {
    super();

    this.state = {
      userEmail: '',
      userUid: '',
      statusFound: false,
    };
  }

  findUser = async () => {
    // event.preventDefault();
    let userUid = await findUserProfileDocument(this.state.userEmail);
    //
    if (!userUid.empty) {
      await this.setState({ userUid: userUid.docs[0].id });

      let userData = await showUserDocument(this.state.userUid);
      await this.setState({ ...userData });
      await this.setState({ statusFound: true });
    } else {
      this.setState({ userEmail: '' });
      console.log('Nothing to see in here');
    }

    await console.log(this.state);

    //return <Test content={this.state.isAdmin} />;
    //await console.log('yay', userData);

    // await console.log('yay', this.state); //console.log(userData.docs[0].id); //this.setState({ userName: userData }, console.log(this.state));
    //await console.log(this.state);
    //await console.log('Userdata: ', userData);
    // await console.log(uid);
    //await this.setState({ userUid: uid }, console.log(this.state.userUid));
    //await console.log(this.state.userUid);
    //this.editUser(userUID)
  };

  changeAdminStatus = async () => {
    //console.log(this.state.isAdmin);
    //await this.setState({ statusFound: true });
    if (this.state.userUid) {
      await this.setState({
        isAdmin: editUser(this.state.userUid, this.state.isAdmin),
      });
      this.findUser();
      //await console.log(this.state.isAdmin);
    }
    // if (this.state.isAdmin) {
    //   await this.setState({ userStatus: 'Admin' });
    //   await console.log(this.state.userStatus);
    // } else {
    //   await this.setState({ userStatus: 'User' });
    //   await console.log(this.state.userStatus);
    // }
    //await this.setState({ statusFound: false });
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  // getStatus = () => {
  //   let status = null;

  //   if (this.state.userUid) {
  //     // How to force re-render to this?
  //     status = (
  //       <div>This users status is: {this.state.isAdmin ? 'Admin' : 'User'}</div>
  //     );
  //   } else {
  //     status = null;
  //   }
  //   return status;
  // };

  render() {
    let status = null;

    if (this.state.statusFound) {
      if (this.state.isAdmin) {
        status = <div>Hello admin</div>;
      } else {
        status = <div>Hello user</div>;
      }
    }

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
        </form>
        <button onClick={() => this.findUser()} type='submit'>
          Find user
        </button>
        <div>
          {status}
          <button onClick={this.changeAdminStatus}>
            EDIT FOUND USERS ADMIN status
          </button>
        </div>
      </div>
    );
  }
}

export default EditUsers;
