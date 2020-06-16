import React from 'react';
import {
  findUserProfileDocument,
  showUserDocument,
  editUser,
} from '../../firebase/firebase.utils';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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

    await console.log('DEMO: Found user: ', this.state.userData);
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
    let status = '';
    if (this.state.statusFound) {
      status = 'This user is ';
      if (this.state.userData.isAdmin) {
        status += 'an admin';
      } else {
        status += 'a subscriber';
      }
    }

    return (
      <Container className='edit-users'>
        <Row>
          <h3>Edit users</h3>
        </Row>
        <Form
          className='edit-users-form'
          onSubmit={(e) => this.findUser(e, true)}>
          <Form.Group as={Row} className='align-items-center'>
            <Col md='3'>
              <Form.Control
                as='input'
                type='text'
                name='userEmail'
                placeholder='user@email.com'
                value={this.state.userEmail}
                onChange={this.handleChange}
                label='email'
                required></Form.Control>
            </Col>
            <Button variant='light' type='submit'>
              Find user by email
            </Button>
          </Form.Group>

          <Form.Group as={Row} className='align-items-center'>
            <Col md='3'>
              <Form.Control readOnly placeholder={status} />
            </Col>

            <Button variant='light' onClick={this.changeAdminStatus}>
              Change USERS ADMIN status
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default EditUsers;
