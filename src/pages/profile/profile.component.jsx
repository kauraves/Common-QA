import React from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


import EditUsers from './../../components/edit-users/edit-users.component';

class ProfilePage extends React.Component {

  render() {

    let name = "";
    let email = "";
    let isAdmin = false;
    let currentUser = this.props.currentUser;

    if (currentUser != null) {
      name = currentUser.displayName;
      email = currentUser.email;
      isAdmin = currentUser.isAdmin;
    }

    return (
      <div className='profile'>
        <h1>Profile</h1>
        <p>Here you can see and edit your profile</p>
        <p>Your role: {isAdmin === true ? 'admin' : 'user'}</p>
        <Form>
          <Form.Group as={Row} className="profileForm">
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Col md="5">
              <Form.Control plaintext readOnly placeholder={name} />
            </Col>
            <Button>
              Edit
            </Button>
          </Form.Group>

          <Form.Group as={Row} className="profileForm">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col md="5">
              <Form.Control plaintext readOnly type="email" placeholder={email} />
            </Col>
            <Button>
              Edit
            </Button>
          </Form.Group>
        </Form>
      </div>
    ); 
  }
}

export default ProfilePage;
